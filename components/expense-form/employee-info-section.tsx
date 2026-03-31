'use client'

import { useI18n } from '@/lib/i18n/context'
import type { EmployeeInfo } from '@/lib/types/expense-form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

interface EmployeeInfoSectionProps {
  data: EmployeeInfo
  onChange: (data: EmployeeInfo) => void
}

export function EmployeeInfoSection({ data, onChange }: EmployeeInfoSectionProps) {
  const { t } = useI18n()

  const handleChange = (field: keyof EmployeeInfo, value: string | number) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t('employeeInfo')}</CardTitle>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>{t('company')} <span className="text-destructive">*</span></FieldLabel>
              <Input
                value={data.company}
                onChange={(e) => handleChange('company', e.target.value)}
                placeholder={t('companyPlaceholder')}
                required
              />
            </Field>
            <Field>
              <FieldLabel>{t('employeeName')} <span className="text-destructive">*</span></FieldLabel>
              <Input
                value={data.employeeName}
                onChange={(e) => handleChange('employeeName', e.target.value)}
                placeholder={t('employeeNamePlaceholder')}
                required
              />
            </Field>
            <Field>
              <FieldLabel>{t('department')} <span className="text-destructive">*</span></FieldLabel>
              <Input
                value={data.department}
                onChange={(e) => handleChange('department', e.target.value)}
                placeholder={t('departmentPlaceholder')}
                required
              />
            </Field>
            <Field>
              <FieldLabel>{t('bms')} <span className="text-destructive">*</span></FieldLabel>
              <Input
                type="number"
                value={data.bms}
                onChange={(e) => handleChange('bms', e.target.value ? Number(e.target.value) : '')}
                placeholder={t('bmsPlaceholder')}
                required
              />
            </Field>
          </div>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
