import { NextResponse } from 'next/server'
import type { ExpenseFormPayload } from '@/lib/types/expense-form'

const POWER_AUTOMATE_URL = process.env.NEXT_PUBLIC_POWER_AUTOMATE_URL

export async function POST(request: Request) {
  try {
    if (!POWER_AUTOMATE_URL) {
      return NextResponse.json(
        { error: 'Power Automate URL is not configured' },
        { status: 500 }
      )
    }

    const payload: ExpenseFormPayload = await request.json()

    // Validate required fields
    if (!payload.employeeInfo.company || !payload.employeeInfo.employeeName || !payload.employeeInfo.department || !payload.employeeInfo.bms) {
      return NextResponse.json(
        { error: 'Missing required employee information' },
        { status: 400 }
      )
    }

    // Validate expenses have all required fields
    for (const expense of payload.expenses) {
      if (!expense.date || !expense.particulars || !expense.refNo || !expense.currency || !expense.sourceAmount || !expense.reimbursementType) {
        return NextResponse.json(
          { error: 'All expense fields are required' },
          { status: 400 }
        )
      }
    }

    // Forward request to Power Automate
    const response = await fetch(POWER_AUTOMATE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Power Automate error:', errorText)
      return NextResponse.json(
        { error: 'Failed to submit to Power Automate' },
        { status: response.status }
      )
    }

    // Return success response
    return NextResponse.json({ success: true, message: 'Form submitted successfully' })
  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
