import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme/tokens';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>حسابي</Text>
        <Text style={styles.hint}>
          شاشة تسجيل الدخول / إنشاء الحساب تُبنى على مسارات /api/auth الموجودة
          فعلياً في الـ backend (انظر src/api/client.ts).
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neutral.white },
  content: { padding: spacing.lg },
  title: { ...typography.h1, color: colors.neutral[900], marginBottom: spacing.md },
  hint: { ...typography.body, color: colors.neutral[500] },
});
