/**
 * IP Management Module for Your Trip Planner
 * 
 * This module provides functionality for managing IP addresses in the application,
 * including storing, validating, and using IP addresses for various purposes.
 */

import { useState, useEffect } from 'react';

// Types
export interface IPAddress {
  id: string;
  address: string;
  label: string;
  createdAt: Date;
  lastUsed?: Date;
  purpose?: string;
  isActive: boolean;
}

// Validation functions
export const validateIPv4 = (ip: string): boolean => {
  const pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return pattern.test(ip);
};

export const validateIPv6 = (ip: string): boolean => {
  const pattern = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  return pattern.test(ip);
};

export const validateIP = (ip: string): boolean => {
  return validateIPv4(ip) || validateIPv6(ip);
};

// Storage service for IP addresses
class IPStorageService {
  private storageKey = 'your_trip_planner_ip_addresses';

  // Get all stored IP addresses
  public getAll(): IPAddress[] {
    const storedData = localStorage.getItem(this.storageKey);
    if (!storedData) return [];
    
    try {
      const parsedData = JSON.parse(storedData);
      return Array.isArray(parsedData) ? parsedData.map(ip => ({
        ...ip,
        createdAt: new Date(ip.createdAt),
        lastUsed: ip.lastUsed ? new Date(ip.lastUsed) : undefined
      })) : [];
    } catch (error) {
      console.error('Error parsing stored IP addresses:', error);
      return [];
    }
  }

  // Save IP addresses
  public saveAll(ipAddresses: IPAddress[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(ipAddresses));
  }

  // Add a new IP address
  public add(ipAddress: Omit<IPAddress, 'id' | 'createdAt'>): IPAddress {
    const ipAddresses = this.getAll();
    
    // Generate a unique ID
    const id = `ip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newIP: IPAddress = {
      ...ipAddress,
      id,
      createdAt: new Date(),
      isActive: true
    };
    
    ipAddresses.push(newIP);
    this.saveAll(ipAddresses);
    
    return newIP;
  }

  // Update an existing IP address
  public update(id: string, updates: Partial<IPAddress>): IPAddress | null {
    const ipAddresses = this.getAll();
    const index = ipAddresses.findIndex(ip => ip.id === id);
    
    if (index === -1) return null;
    
    const updatedIP = {
      ...ipAddresses[index],
      ...updates
    };
    
    ipAddresses[index] = updatedIP;
    this.saveAll(ipAddresses);
    
    return updatedIP;
  }

  // Delete an IP address
  public delete(id: string): boolean {
    const ipAddresses = this.getAll();
    const filteredIPs = ipAddresses.filter(ip => ip.id !== id);
    
    if (filteredIPs.length === ipAddresses.length) {
      return false; // No IP was deleted
    }
    
    this.saveAll(filteredIPs);
    return true;
  }

  // Mark an IP as used
  public markAsUsed(id: string): IPAddress | null {
    return this.update(id, { lastUsed: new Date() });
  }
}

// Create a singleton instance
export const ipStorageService = new IPStorageService();

// React hook for managing IP addresses
export function useIPAddresses() {
  const [ipAddresses, setIPAddresses] = useState<IPAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load IP addresses on component mount
  useEffect(() => {
    try {
      const addresses = ipStorageService.getAll();
      setIPAddresses(addresses);
      setError(null);
    } catch (err) {
      setError('Failed to load IP addresses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new IP address
  const addIPAddress = (address: string, label: string, purpose?: string) => {
    if (!validateIP(address)) {
      setError('Invalid IP address format');
      return null;
    }

    try {
      const newIP = ipStorageService.add({ address, label, purpose, isActive: true });
      setIPAddresses(prev => [...prev, newIP]);
      setError(null);
      return newIP;
    } catch (err) {
      setError('Failed to add IP address');
      console.error(err);
      return null;
    }
  };

  // Update an IP address
  const updateIPAddress = (id: string, updates: Partial<IPAddress>) => {
    if (updates.address && !validateIP(updates.address)) {
      setError('Invalid IP address format');
      return false;
    }

    try {
      const updatedIP = ipStorageService.update(id, updates);
      if (!updatedIP) {
        setError('IP address not found');
        return false;
      }
      
      setIPAddresses(prev => prev.map(ip => ip.id === id ? updatedIP : ip));
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to update IP address');
      console.error(err);
      return false;
    }
  };

  // Delete an IP address
  const deleteIPAddress = (id: string) => {
    try {
      const success = ipStorageService.delete(id);
      if (success) {
        setIPAddresses(prev => prev.filter(ip => ip.id !== id));
        setError(null);
      } else {
        setError('IP address not found');
      }
      return success;
    } catch (err) {
      setError('Failed to delete IP address');
      console.error(err);
      return false;
    }
  };

  // Mark an IP as used
  const markIPAsUsed = (id: string) => {
    try {
      const updatedIP = ipStorageService.markAsUsed(id);
      if (!updatedIP) {
        return false;
      }
      
      setIPAddresses(prev => prev.map(ip => ip.id === id ? updatedIP : ip));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return {
    ipAddresses,
    loading,
    error,
    addIPAddress,
    updateIPAddress,
    deleteIPAddress,
    markIPAsUsed
  };
}

export default ipStorageService;
