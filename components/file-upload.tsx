'use client'

import { useRef } from 'react'
import { Upload, X, FileText, FileSpreadsheet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FileUploadProps {
  value: File | null
  onChange: (file: File | null) => void
  onRemove: () => void
  accept?: string
  placeholder?: string
  chooseFileText?: string
  noFileText?: string
  acceptedFormatsText?: string
  className?: string
}

export function FileUpload({
  value,
  onChange,
  onRemove,
  accept = '.pdf,.xlsx',
  placeholder = 'Upload File',
  chooseFileText = 'Choose file',
  noFileText = 'No file chosen',
  acceptedFormatsText = 'Accepted: PDF, XLSX',
  className,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    onChange(file)
  }

  const getFileIcon = () => {
    if (!value) return <Upload className="size-4" />
    if (value.name.endsWith('.pdf')) return <FileText className="size-4 text-red-500" />
    if (value.name.endsWith('.xlsx')) return <FileSpreadsheet className="size-4 text-green-600" />
    return <FileText className="size-4" />
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          className="flex items-center gap-2"
        >
          {getFileIcon()}
          <span>{value ? value.name : chooseFileText}</span>
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="size-8 text-destructive hover:text-destructive"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
      {!value && (
        <p className="text-xs text-muted-foreground">{acceptedFormatsText}</p>
      )}
    </div>
  )
}
