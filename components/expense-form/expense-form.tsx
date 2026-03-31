'use client'

import { useState } from 'react'
import { useI18n } from '@/lib/i18n/context'
import type { EmployeeInfo, ExpenseRow, AttachmentRow, ExpenseFormPayload } from '@/lib/types/expense-form'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { LanguageSwitcher } from '@/components/language-switcher'
import { EmployeeInfoSection } from './employee-info-section'
import { ExpenseBreakdownSection } from './expense-breakdown-section'
import { AttachmentsSection } from './attachments-section'

const initialEmployeeInfo: EmployeeInfo = {
  company: '',
  employeeName: '',
  department: '',
  bms: '',
}

const createInitialExpense = (): ExpenseRow => ({
  id: crypto.randomUUID(),
  date: null,
  particulars: '',
  refNo: '',
  currency: '',
  sourceAmount: '',
  reimbursementType: '',
})

const createInitialAttachment = (): AttachmentRow => ({
  id: crypto.randomUUID(),
  file: null,
  base64: '',
  filename: '',
  filetype: '',
})

export function ExpenseForm() {
  const { t } = useI18n()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo>(initialEmployeeInfo)
  const [expenses, setExpenses] = useState<ExpenseRow[]>([createInitialExpense()])
  const [attachments, setAttachments] = useState<AttachmentRow[]>([createInitialAttachment()])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const payload: ExpenseFormPayload = {
        employeeInfo: {
          company: employeeInfo.company,
          employeeName: employeeInfo.employeeName,
          department: employeeInfo.department,
          bms: typeof employeeInfo.bms === 'number' ? employeeInfo.bms : 0,
        },
        expenses: expenses.map((expense) => ({
          date: expense.date ? expense.date.toISOString() : null,
          particulars: expense.particulars,
          refNo: expense.refNo,
          currency: expense.currency,
          sourceAmount: expense.sourceAmount,
          reimbursementType: expense.reimbursementType,
        })),
        attachments: attachments
          .filter((a) => a.base64)
          .map((a) => ({
            filename: a.filename,
            filetype: a.filetype,
            base64Content: a.base64,
          })),
        submittedAt: new Date().toISOString(),
      }

      const response = await fetch('/api/submit-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitStatus('success')
      // Reset form
      setEmployeeInfo(initialEmployeeInfo)
      setExpenses([createInitialExpense()])
      setAttachments([createInitialAttachment()])
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">E</span>
            </div>
            <h1 className="text-2xl font-bold text-balance">{t('formTitle')}</h1>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <EmployeeInfoSection
            data={employeeInfo}
            onChange={setEmployeeInfo}
          />

          <ExpenseBreakdownSection
            expenses={expenses}
            onChange={setExpenses}
          />

          <AttachmentsSection
            attachments={attachments}
            onChange={setAttachments}
          />

          {/* Submit Status */}
          {submitStatus === 'success' && (
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200">
              {t('submitSuccess')}
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
              {t('submitError')}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="min-w-[150px]"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="mr-2" />
                  {t('submitting')}
                </>
              ) : (
                t('submit')
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
