'use client'

import { Plus, Trash2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import type { AttachmentRow } from '@/lib/types/expense-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileUpload } from '@/components/file-upload'

interface AttachmentsSectionProps {
  attachments: AttachmentRow[]
  onChange: (attachments: AttachmentRow[]) => void
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = (error) => reject(error)
  })
}

export function AttachmentsSection({ attachments, onChange }: AttachmentsSectionProps) {
  const { t } = useI18n()

  const addAttachment = () => {
    const newAttachment: AttachmentRow = {
      id: crypto.randomUUID(),
      file: null,
      base64: '',
      filename: '',
      filetype: '',
    }
    onChange([...attachments, newAttachment])
  }

  const removeAttachment = (id: string) => {
    if (attachments.length > 1) {
      onChange(attachments.filter((a) => a.id !== id))
    }
  }

  const updateAttachment = async (id: string, file: File | null) => {
    if (!file) {
      onChange(
        attachments.map((a) =>
          a.id === id
            ? { ...a, file: null, base64: '', filename: '', filetype: '' }
            : a
        )
      )
      return
    }

    try {
      const base64 = await fileToBase64(file)
      const filetype = file.name.split('.').pop()?.toLowerCase() || ''
      
      onChange(
        attachments.map((a) =>
          a.id === id
            ? { ...a, file, base64, filename: file.name, filetype }
            : a
        )
      )
    } catch (error) {
      console.error('Error converting file to base64:', error)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{t('attachments')}</CardTitle>
        <Button type="button" variant="outline" size="sm" onClick={addAttachment}>
          <Plus className="size-4 mr-2" />
          {t('addAttachment')}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {attachments.map((attachment, index) => (
          <div
            key={attachment.id}
            className="flex items-start gap-4 p-4 border rounded-lg bg-muted/30"
          >
            <div className="flex-1">
              <span className="text-sm font-medium text-muted-foreground block mb-2">
                {t('file')} #{index + 1}
              </span>
              <FileUpload
                value={attachment.file}
                onChange={(file) => updateAttachment(attachment.id, file)}
                onRemove={() => updateAttachment(attachment.id, null)}
                chooseFileText={t('chooseFile')}
                noFileText={t('noFileChosen')}
                acceptedFormatsText={t('acceptedFormats')}
              />
            </div>
            {attachments.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeAttachment(attachment.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="size-4 mr-2" />
                {t('removeAttachment')}
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
