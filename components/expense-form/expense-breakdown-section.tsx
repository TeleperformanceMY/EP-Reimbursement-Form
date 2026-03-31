'use client'

import { Plus, Trash2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import type { ExpenseRow, ReimbursementType } from '@/lib/types/expense-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DatePicker } from '@/components/date-picker'

interface ExpenseBreakdownSectionProps {
  expenses: ExpenseRow[]
  onChange: (expenses: ExpenseRow[]) => void
}

export function ExpenseBreakdownSection({ expenses, onChange }: ExpenseBreakdownSectionProps) {
  const { t } = useI18n()

  const reimbursementTypes: { value: ReimbursementType; labelKey: 'eVisa' | 'medicalCheckup' | 'ctcFees' }[] = [
    { value: 'eVisa', labelKey: 'eVisa' },
    { value: 'medicalCheckup', labelKey: 'medicalCheckup' },
    { value: 'ctcFees', labelKey: 'ctcFees' },
  ]

  const addRow = () => {
    const newRow: ExpenseRow = {
      id: crypto.randomUUID(),
      date: null,
      particulars: '',
      refNo: '',
      currency: '',
      sourceAmount: '',
      reimbursementType: '',
    }
    onChange([...expenses, newRow])
  }

  const removeRow = (id: string) => {
    if (expenses.length > 1) {
      onChange(expenses.filter((row) => row.id !== id))
    }
  }

  const updateRow = (id: string, field: keyof ExpenseRow, value: ExpenseRow[keyof ExpenseRow]) => {
    onChange(
      expenses.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{t('expenseBreakdown')}</CardTitle>
        <Button type="button" variant="outline" size="sm" onClick={addRow}>
          <Plus className="size-4 mr-2" />
          {t('addRow')}
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {expenses.map((expense, index) => (
          <div
            key={expense.id}
            className="p-4 border rounded-lg bg-muted/30 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {t('expense')} #{index + 1}
              </span>
              {expenses.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeRow(expense.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="size-4 mr-2" />
                  {t('removeRow')}
                </Button>
              )}
            </div>
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>{t('date')} <span className="text-destructive">*</span></FieldLabel>
                  <DatePicker
                    value={expense.date}
                    onChange={(date) => updateRow(expense.id, 'date', date ?? null)}
                    placeholder={t('datePlaceholder')}
                  />
                </Field>
                <Field>
                  <FieldLabel>{t('particulars')} <span className="text-destructive">*</span></FieldLabel>
                  <Input
                    value={expense.particulars}
                    onChange={(e) => updateRow(expense.id, 'particulars', e.target.value)}
                    placeholder={t('particularsPlaceholder')}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>{t('refNo')} <span className="text-destructive">*</span></FieldLabel>
                  <Input
                    value={expense.refNo}
                    onChange={(e) => updateRow(expense.id, 'refNo', e.target.value)}
                    placeholder={t('refNoPlaceholder')}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>{t('currency')} <span className="text-destructive">*</span></FieldLabel>
                  <Input
                    value={expense.currency}
                    onChange={(e) => updateRow(expense.id, 'currency', e.target.value)}
                    placeholder={t('currencyPlaceholder')}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>{t('sourceAmount')} <span className="text-destructive">*</span></FieldLabel>
                  <Input
                    value={expense.sourceAmount}
                    onChange={(e) => updateRow(expense.id, 'sourceAmount', e.target.value)}
                    placeholder={t('sourceAmountPlaceholder')}
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel>{t('reimbursementType')} <span className="text-destructive">*</span></FieldLabel>
                  <Select
                    required
                    value={expense.reimbursementType}
                    onValueChange={(value) => updateRow(expense.id, 'reimbursementType', value as ReimbursementType)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('reimbursementTypePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {reimbursementTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {t(type.labelKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </FieldGroup>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
