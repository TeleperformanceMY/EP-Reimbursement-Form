export type ReimbursementType = 'eVisa' | 'medicalCheckup' | 'ctcFees'

export interface ExpenseRow {
  id: string
  date: Date | null
  particulars: string
  refNo: string
  currency: string
  sourceAmount: string
  reimbursementType: ReimbursementType | ''
}

export interface AttachmentRow {
  id: string
  file: File | null
  base64: string
  filename: string
  filetype: string
}

export interface EmployeeInfo {
  company: string
  employeeName: string
  department: string
  bms: number | ''
}

export interface ExpenseFormData {
  employeeInfo: EmployeeInfo
  expenses: ExpenseRow[]
  attachments: AttachmentRow[]
}

// Payload for API submission
export interface ExpenseFormPayload {
  employeeInfo: {
    company: string
    employeeName: string
    department: string
    bms: number
  }
  expenses: {
    date: string | null
    particulars: string
    refNo: string
    currency: string
    sourceAmount: string
    reimbursementType: string
  }[]
  attachments: {
    filename: string
    filetype: string
    base64Content: string
  }[]
  submittedAt: string
}
