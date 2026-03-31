export type Locale = 'en' | 'zh' | 'ja'

export const translations = {
  en: {
    // Header
    formTitle: 'Expense Reimbursement Form',
    
    // Language
    language: 'Language',
    
    // Employee Information Section
    employeeInfo: 'Employee Information',
    company: 'Company',
    companyPlaceholder: 'Enter company name',
    employeeName: 'Employee Name',
    employeeNamePlaceholder: 'Enter employee name',
    department: 'Department',
    departmentPlaceholder: 'Enter department',
    bms: 'BMS',
    bmsPlaceholder: 'Enter BMS',
    
    // Expense Breakdown Section
    expenseBreakdown: 'Expense Breakdown',
    addRow: 'Add Row',
    removeRow: 'Remove',
    date: 'Date',
    datePlaceholder: 'Select date',
    particulars: 'Particulars',
    particularsPlaceholder: 'Enter particulars',
    refNo: 'Ref No',
    refNoPlaceholder: 'Enter reference number',
    currency: 'Currency',
    currencyPlaceholder: 'e.g. USD, PHP',
    sourceAmount: 'Source Amount',
    sourceAmountPlaceholder: 'Enter amount',
    reimbursementType: 'Reimbursement Type',
    reimbursementTypePlaceholder: 'Select type',
    
    // Reimbursement Types
    eVisa: 'eVisa',
    medicalCheckup: 'Medical Checkup (POEA related)',
    ctcFees: 'CTC Fees',
    
    // Attachments Section
    attachments: 'Attachments',
    addAttachment: 'Add Attachment',
    removeAttachment: 'Remove',
    uploadFile: 'Upload File',
    chooseFile: 'Choose file',
    noFileChosen: 'No file chosen',
    acceptedFormats: 'Accepted: PDF, XLSX',
    
    // Form Actions
    submit: 'Submit Form',
    submitting: 'Submitting...',
    
    // Validation Messages
    required: 'This field is required',
    invalidDate: 'Invalid date',
    invalidFile: 'Invalid file type. Only PDF and XLSX files are accepted.',
    
    // Success/Error Messages
    submitSuccess: 'Form submitted successfully!',
    submitError: 'Failed to submit form. Please try again.',
    
    // Row labels
    row: 'Row',
    expense: 'Expense',
    file: 'File',
  },
  zh: {
    // Header
    formTitle: '费用报销表',
    
    // Language
    language: '语言',
    
    // Employee Information Section
    employeeInfo: '员工信息',
    company: '公司',
    companyPlaceholder: '请输入公司名称',
    employeeName: '员工姓名',
    employeeNamePlaceholder: '请输入员工姓名',
    department: '部门',
    departmentPlaceholder: '请输入部门',
    bms: 'BMS',
    bmsPlaceholder: '请输入BMS',
    
    // Expense Breakdown Section
    expenseBreakdown: '费用明细',
    addRow: '添加行',
    removeRow: '删除',
    date: '日期',
    datePlaceholder: '选择日期',
    particulars: '详情',
    particularsPlaceholder: '请输入详情',
    refNo: '参考编号',
    refNoPlaceholder: '请输入参考编号',
    currency: '货币',
    currencyPlaceholder: '例如 USD, PHP',
    sourceAmount: '来源金额',
    sourceAmountPlaceholder: '请输入金额',
    reimbursementType: '报销类型',
    reimbursementTypePlaceholder: '选择类型',
    
    // Reimbursement Types
    eVisa: '电子签证',
    medicalCheckup: '体检（POEA相关）',
    ctcFees: 'CTC费用',
    
    // Attachments Section
    attachments: '附件',
    addAttachment: '添加附件',
    removeAttachment: '删除',
    uploadFile: '上传文件',
    chooseFile: '选择文件',
    noFileChosen: '未选择文件',
    acceptedFormats: '支持格式：PDF、XLSX',
    
    // Form Actions
    submit: '提交表单',
    submitting: '提交中...',
    
    // Validation Messages
    required: '此字段为必填项',
    invalidDate: '日期无效',
    invalidFile: '文件类型无效。仅接受PDF和XLSX文件。',
    
    // Success/Error Messages
    submitSuccess: '表单提交成功！',
    submitError: '提交失败，请重试。',
    
    // Row labels
    row: '行',
    expense: '费用',
    file: '文件',
  },
  ja: {
    // Header
    formTitle: '経費精算フォーム',
    
    // Language
    language: '言語',
    
    // Employee Information Section
    employeeInfo: '従業員情報',
    company: '会社',
    companyPlaceholder: '会社名を入力',
    employeeName: '従業員名',
    employeeNamePlaceholder: '従業員名を入力',
    department: '部署',
    departmentPlaceholder: '部署を入力',
    bms: 'BMS',
    bmsPlaceholder: 'BMSを入力',
    
    // Expense Breakdown Section
    expenseBreakdown: '経費明細',
    addRow: '行を追加',
    removeRow: '削除',
    date: '日付',
    datePlaceholder: '日付を選択',
    particulars: '詳細',
    particularsPlaceholder: '詳細を入力',
    refNo: '参照番号',
    refNoPlaceholder: '参照番号を入力',
    currency: '通貨',
    currencyPlaceholder: '例: USD, PHP',
    sourceAmount: '元金額',
    sourceAmountPlaceholder: '金額を入力',
    reimbursementType: '精算タイプ',
    reimbursementTypePlaceholder: 'タイプを選択',
    
    // Reimbursement Types
    eVisa: '電子ビザ',
    medicalCheckup: '健康診断（POEA関連）',
    ctcFees: 'CTC手数料',
    
    // Attachments Section
    attachments: '添付ファイル',
    addAttachment: '添付を追加',
    removeAttachment: '削除',
    uploadFile: 'ファイルをアップロード',
    chooseFile: 'ファイルを選択',
    noFileChosen: 'ファイル未選択',
    acceptedFormats: '対応形式：PDF、XLSX',
    
    // Form Actions
    submit: 'フォームを送信',
    submitting: '送信中...',
    
    // Validation Messages
    required: 'この項目は必須です',
    invalidDate: '無効な日付です',
    invalidFile: '無効なファイル形式です。PDFとXLSXファイルのみ対応しています。',
    
    // Success/Error Messages
    submitSuccess: 'フォームが正常に送信されました！',
    submitError: '送信に失敗しました。もう一度お試しください。',
    
    // Row labels
    row: '行',
    expense: '経費',
    file: 'ファイル',
  },
} as const

export type TranslationKey = keyof typeof translations.en

export function getTranslations(locale: Locale) {
  return translations[locale]
}
