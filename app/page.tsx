import { I18nProvider } from '@/lib/i18n/context'
import { ExpenseForm } from '@/components/expense-form/expense-form'

export default function Home() {
  return (
    <I18nProvider>
      <ExpenseForm />
    </I18nProvider>
  )
}
