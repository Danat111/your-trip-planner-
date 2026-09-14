import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, typography } from '../theme/tokens';

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>إلى أين رحلتك القادمة؟</Text>
        <Text style={styles.subtitle}>
          خطط رحلة مخصصة بمساعدة الذكاء الاصطناعي في ثوانٍ
        </Text>

        <TouchableOpacity
          style={styles.ctaCard}
          onPress={() => navigation.navigate('TripPlanner')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaTitle}>خطط رحلة جديدة</Text>
          <Text style={styles.ctaSubtitle}>وجهتك، ميزانيتك، اهتماماتك — والباقي علينا</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>رحلاتي المحفوظة</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>لا توجد رحلات محفوظة بعد.</Text>
          <Text style={styles.emptyStateHint}>ابدأ بتخطيط أول رحلة لك من الأعلى.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.neutral.white },
  content: { padding: spacing.lg },
  greeting: { ...typography.h1, color: colors.neutral[900], marginBottom: spacing.xs },
  subtitle: { ...typography.body, color: colors.neutral[500], marginBottom: spacing.lg },
  ctaCard: {
    backgroundColor: colors.primary[600],
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  ctaTitle: { ...typography.h2, color: colors.neutral.white, marginBottom: spacing.xs },
  ctaSubtitle: { ...typography.body, color: colors.primary[50] },
  sectionTitle: { ...typography.h2, color: colors.neutral[900], marginBottom: spacing.md },
  emptyState: {
    borderWidth: 1,
    borderColor: colors.neutral[100],
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  emptyStateText: { ...typography.body, color: colors.neutral[700] },
  emptyStateHint: { ...typography.caption, color: colors.neutral[500], marginTop: spacing.xs },
});
