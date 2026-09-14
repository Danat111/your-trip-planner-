import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { api } from '../api/client';
import { colors, radius, spacing, typography } from '../theme/tokens';

const BUDGET_OPTIONS = ['budget', 'mid-range', 'luxury'] as const;

export default function TripPlannerScreen() {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState<(typeof BUDGET_OPTIONS)[number]>('mid-range');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<any>(null);

  const canSubmit = destination.trim() && startDate.trim() && endDate.trim() && !loading;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.generateTripPlan({
        destination,
        startDate,
        endDate,
        budget,
        interests: [],
        travelStyle: 'balanced',
        accommodation: 'hotel',
      });
      setPlan(result);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء توليد الخطة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>خطط رحلتك</Text>

        <Field label="الوجهة" value={destination} onChangeText={setDestination} placeholder="مثال: باريس" />
        <View style={styles.row}>
          <View style={styles.half}>
            <Field label="تاريخ البدء" value={startDate} onChangeText={setStartDate} placeholder="YYYY-MM-DD" />
          </View>
          <View style={styles.half}>
            <Field label="تاريخ الانتهاء" value={endDate} onChangeText={setEndDate} placeholder="YYYY-MM-DD" />
          </View>
        </View>

        <Text style={styles.label}>الميزانية</Text>
        <View style={styles.row}>
          {BUDGET_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.pill, budget === opt && styles.pillActive]}
              onPress={() => setBudget(opt)}
            >
              <Text style={[styles.pillText, budget === opt && styles.pillTextActive]}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
          disabled={!canSubmit}
          onPress={handleGenerate}
        >
          {loading ? (
            <ActivityIndicator color={colors.neutral.white} />
          ) : (
            <Text style={styles.submitText}>ولّد الخطة بالذكاء الاصطناعي</Text>
          )}
        </TouchableOpacity>

        {error && <Text style={styles.error}>{error}</Text>}

        {plan?.aiPlan && (
          <View style={styles.planBox}>
            <Text style={styles.planSummary}>{plan.aiPlan.summary}</Text>
            {plan.aiPlan.days?.map((day: any) => (
              <View key={day.day} style={styles.dayCard}>
                <Text style={styles.dayTitle}>
                  اليوم {day.day} — {day.title}
                </Text>
                <Text style={styles.dayText}>صباحاً: {day.morning}</Text>
                <Text style={styles.dayText}>ظهراً: {day.afternoon}</Text>
                <Text style={styles.dayText}>مساءً: {day.evening}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Field(props: { label: string; value: string; onChangeText: (v: string) => void; placeholder: string }) {
  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={colors.neutral[500]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neutral.white },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  title: { ...typography.h1, color: colors.neutral[900], marginBottom: spacing.lg },
  label: { ...typography.caption, color: colors.neutral[700], marginBottom: spacing.xs },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral[100],
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...typography.body,
    color: colors.neutral[900],
  },
  row: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  half: { flex: 1 },
  pill: {
    borderWidth: 1,
    borderColor: colors.neutral[100],
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  pillActive: { backgroundColor: colors.primary[600], borderColor: colors.primary[600] },
  pillText: { ...typography.caption, color: colors.neutral[700] },
  pillTextActive: { color: colors.neutral.white },
  submitButton: {
    backgroundColor: colors.primary[600],
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  submitButtonDisabled: { opacity: 0.5 },
  submitText: { ...typography.body, color: colors.neutral.white, fontWeight: '600' },
  error: { color: '#dc2626', marginTop: spacing.md },
  planBox: { marginTop: spacing.xl },
  planSummary: { ...typography.body, color: colors.neutral[700], marginBottom: spacing.md },
  dayCard: {
    backgroundColor: colors.neutral[50],
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  dayTitle: { ...typography.h2, fontSize: 16, color: colors.neutral[900], marginBottom: spacing.xs },
  dayText: { ...typography.caption, color: colors.neutral[700], marginBottom: 2 },
});
