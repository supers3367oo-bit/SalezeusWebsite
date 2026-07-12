import { useEffect, useId, useRef, useState } from 'react'
import { ExternalLink, Link2, Link2Off } from 'lucide-react'
import clsx from 'clsx'
import type { InlineSpan } from '../../types/insights'
import type { BilingualRichText } from '../types/adminContent'
import { useAdminContent } from '../content/AdminContentContext'
import {
  defaultLinkRel,
  htmlToSpans,
  spansToHtml,
} from '../utils/richText'

type SingleEditorProps = {
  label: string
  dir: 'ltr' | 'rtl'
  value: InlineSpan[]
  onChange: (next: InlineSpan[]) => void
  accentClass: string
  minHeight?: number
}

function RichTextSingle({
  label,
  dir,
  value,
  onChange,
  accentClass,
  minHeight = 120,
}: SingleEditorProps) {
  const { uiLocale, pushToast } = useAdminContent()
  const isAr = uiLocale === 'ar'
  const editorRef = useRef<HTMLDivElement>(null)
  const lastEmittedRef = useRef<string | null>(null)
  /** Saved while dialog is open — browser selection is lost when focusing URL inputs */
  const savedRangeRef = useRef<Range | null>(null)
  const [linkOpen, setLinkOpen] = useState(false)
  const [href, setHref] = useState('https://')
  const [linkText, setLinkText] = useState('')
  const [hasSelection, setHasSelection] = useState(false)
  const [nofollow, setNofollow] = useState(false)

  useEffect(() => {
    const el = editorRef.current
    if (!el) return
    const serialized = JSON.stringify(value)
    if (serialized === lastEmittedRef.current) return
    lastEmittedRef.current = serialized
    const nextHtml = spansToHtml(value)
    if (el.innerHTML !== nextHtml) {
      el.innerHTML = nextHtml || ''
    }
  }, [value])

  const emitFromDom = () => {
    const el = editorRef.current
    if (!el) return
    const next = htmlToSpans(el)
    lastEmittedRef.current = JSON.stringify(next)
    onChange(next)
  }

  const captureSelectionInEditor = (): { range: Range; text: string } | null => {
    const el = editorRef.current
    const selection = window.getSelection()
    if (!el || !selection || selection.rangeCount === 0) return null
    const range = selection.getRangeAt(0)
    if (!el.contains(range.commonAncestorContainer)) return null
    if (range.collapsed) return null
    return { range: range.cloneRange(), text: selection.toString() }
  }

  const openLinkDialog = () => {
    const captured = captureSelectionInEditor()
    savedRangeRef.current = captured?.range ?? null
    setHasSelection(Boolean(captured?.text.trim()))
    setLinkText(captured?.text.trim() || '')
    setHref('https://')
    setNofollow(false)
    setLinkOpen(true)
  }

  const closeLinkDialog = () => {
    savedRangeRef.current = null
    setHasSelection(false)
    setLinkOpen(false)
  }

  const applyLink = () => {
    const el = editorRef.current
    if (!el) return
    const url = href.trim()
    if (!url) {
      pushToast(isAr ? 'أدخل رابطاً صالحاً' : 'Enter a valid URL', 'error')
      return
    }

    const display = linkText.trim() || url
    const relParts = [defaultLinkRel(url), nofollow ? 'nofollow' : '']
      .filter(Boolean)
      .join(' ')

    const a = document.createElement('a')
    a.href = url
    if (relParts) a.rel = relParts
    a.textContent = display

    const range = savedRangeRef.current
    el.focus()

    if (range && el.contains(range.commonAncestorContainer)) {
      // Wrap the previously selected word/phrase as a link
      range.deleteContents()
      range.insertNode(a)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      const after = document.createRange()
      after.setStartAfter(a)
      after.collapse(true)
      selection?.addRange(after)
    } else {
      // No selection: insert link at end (or replace empty editor)
      if (el.childNodes.length) el.appendChild(document.createTextNode(' '))
      el.appendChild(a)
    }

    emitFromDom()
    closeLinkDialog()
  }

  const removeLinks = () => {
    const el = editorRef.current
    if (!el) return

    const captured = captureSelectionInEditor()
    if (captured) {
      // Unlink only anchors intersecting the selection
      const anchors = Array.from(el.querySelectorAll('a'))
      anchors.forEach((anchor) => {
        if (!captured.range.intersectsNode(anchor)) return
        const text = document.createTextNode(anchor.textContent ?? '')
        anchor.replaceWith(text)
      })
    } else {
      el.querySelectorAll('a').forEach((anchor) => {
        const text = document.createTextNode(anchor.textContent ?? '')
        anchor.replaceWith(text)
      })
    }
    emitFromDom()
  }

  return (
    <div className="space-y-1.5">
      <span className={clsx('text-[11px] font-semibold uppercase tracking-wider', accentClass)}>
        {label}
      </span>
      <div className="overflow-hidden rounded-xl border border-sz-border bg-white focus-within:border-sz-interaction focus-within:ring-2 focus-within:ring-sz-interaction/20">
        <div className="flex flex-wrap items-center gap-1 border-b border-sz-border bg-sz-surface/60 px-2 py-1.5">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={openLinkDialog}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-sz-dark transition hover:bg-white"
            title={
              isAr
                ? 'حدّد كلمة أو جملة ثم اضغط لإضافة رابط'
                : 'Select a word or phrase, then add a link'
            }
          >
            <Link2 className="h-3.5 w-3.5 text-sz-interaction" />
            {isAr ? 'رابط' : 'Link'}
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={removeLinks}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-sz-primary/70 transition hover:bg-white"
            title={
              isAr
                ? 'أزل الرابط من النص المحدد (أو كل الروابط إن لم تحدد شيئاً)'
                : 'Remove link from selection (or all links if nothing selected)'
            }
          >
            <Link2Off className="h-3.5 w-3.5" />
            {isAr ? 'إزالة' : 'Unlink'}
          </button>
          <span className="ms-auto hidden items-center gap-1 text-[10px] text-sz-primary/45 sm:inline-flex">
            <ExternalLink className="h-3 w-3" />
            SEO
          </span>
        </div>

        <div
          ref={editorRef}
          role="textbox"
          aria-multiline="true"
          contentEditable
          suppressContentEditableWarning
          dir={dir}
          onInput={emitFromDom}
          onBlur={emitFromDom}
          className={clsx(
            'px-3.5 py-2.5 text-sm text-sz-dark outline-none',
            '[&_a]:text-sz-interaction [&_a]:underline [&_a]:underline-offset-2',
            dir === 'rtl' ? 'font-arabic text-right' : 'font-body text-left',
          )}
          style={{ minHeight }}
        />

        {linkOpen ? (
          <div className="space-y-3 border-t border-sz-border bg-sz-surface/40 p-3">
            {hasSelection ? (
              <p className="rounded-lg bg-sz-interaction/10 px-2.5 py-1.5 text-xs text-sz-interaction">
                {isAr
                  ? 'النص المحدد سيصبح رابطاً. يمكنك تعديل النص أدناه إن أردت.'
                  : 'The selected text will become a link. You can edit the label below.'}
              </p>
            ) : (
              <p className="rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs text-amber-800">
                {isAr
                  ? 'لم يتم تحديد نص — سيُدرج الرابط في نهاية الفقرة. حدّدي كلمة/جملة أولاً لربطها.'
                  : 'No text selected — the link will be appended. Select a word/phrase first to wrap it.'}
              </p>
            )}
            <label className="block space-y-1">
              <span className="text-xs font-medium text-sz-dark">
                {isAr ? 'نص الرابط' : 'Link text'}
              </span>
              <input
                className="w-full rounded-lg border border-sz-border bg-white px-3 py-2 text-sm outline-none focus:border-sz-interaction"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder={isAr ? 'الكلمة أو الجملة الظاهرة كرابط' : 'Visible link label'}
                dir={dir}
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-medium text-sz-dark">
                {isAr ? 'الرابط (URL)' : 'URL'}
              </span>
              <input
                className="w-full rounded-lg border border-sz-border bg-white px-3 py-2 text-sm outline-none focus:border-sz-interaction"
                value={href}
                onChange={(e) => setHref(e.target.value)}
                placeholder="https://… or /services/…"
                dir="ltr"
                autoFocus
              />
            </label>
            <label className="flex items-center gap-2 text-xs text-sz-primary/70">
              <input
                type="checkbox"
                checked={nofollow}
                onChange={(e) => setNofollow(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-sz-border text-sz-interaction"
              />
              rel=&quot;nofollow&quot; {isAr ? '(اختياري للـ SEO)' : '(optional for SEO)'}
            </label>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeLinkDialog}
                className="rounded-lg px-3 py-1.5 text-xs text-sz-primary/60 hover:bg-white"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={applyLink}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sz-interaction px-3 py-1.5 text-xs font-medium text-white"
              >
                <Link2 className="h-3.5 w-3.5" />
                {hasSelection
                  ? isAr
                    ? 'تحويل النص لرابط'
                    : 'Make selection a link'
                  : isAr
                    ? 'إدراج الرابط'
                    : 'Insert link'}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

type Props = {
  label: string
  value: BilingualRichText
  onChange: (next: BilingualRichText) => void
  hint?: string
  minHeight?: number
}

export default function RichTextField({ label, value, onChange, hint, minHeight }: Props) {
  const { uiLocale } = useAdminContent()
  const fieldId = useId()

  return (
    <div className="space-y-2" id={fieldId}>
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-sm font-medium text-sz-dark">{label}</label>
        {hint ? <span className="text-xs text-sz-primary/60">{hint}</span> : null}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <RichTextSingle
          label="English"
          dir="ltr"
          value={value.en}
          accentClass="text-sz-interaction"
          minHeight={minHeight}
          onChange={(en) => onChange({ ...value, en })}
        />
        <RichTextSingle
          label="العربية"
          dir="rtl"
          value={value.ar}
          accentClass="text-sz-accent"
          minHeight={minHeight}
          onChange={(ar) => onChange({ ...value, ar })}
        />
      </div>
      <p className="text-xs text-sz-primary/50">
        {uiLocale === 'ar'
          ? 'حدّد نصاً ثم اضغط «رابط» لإدراج لينك داخلي أو خارجي لتحسين الـ SEO'
          : 'Select text, then use Link to insert internal or external URLs for SEO'}
      </p>
    </div>
  )
}
