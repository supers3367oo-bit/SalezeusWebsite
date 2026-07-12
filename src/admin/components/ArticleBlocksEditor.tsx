import {
  ChevronDown,
  ChevronUp,
  Heading2,
  Image as ImageIcon,
  Images,
  List,
  ListOrdered,
  MessageSquareQuote,
  NotebookPen,
  Plus,
  Sparkles,
  Trash2,
  Type,
} from 'lucide-react'
import type { AdminContentBlock, BilingualRichText } from '../types/adminContent'
import BilingualField from './BilingualField'
import ImageUploadField from './ImageUploadField'
import RichTextField from './RichTextField'
import { useAdminContent } from '../content/AdminContentContext'
import { bi, emptyRich, slugifyHeading } from '../utils/richText'

type Props = {
  blocks: AdminContentBlock[]
  onChange: (next: AdminContentBlock[]) => void
}

const BLOCK_LABELS: Record<AdminContentBlock['type'], { en: string; ar: string }> = {
  paragraph: { en: 'Paragraph', ar: 'فقرة' },
  heading: { en: 'Heading', ar: 'عنوان' },
  pullquote: { en: 'Pull quote', ar: 'اقتباس' },
  stat: { en: 'Stat', ar: 'إحصائية' },
  gallery: { en: 'Gallery', ar: 'معرض' },
  code: { en: 'Code', ar: 'كود' },
  note: { en: 'Note', ar: 'ملاحظة' },
  callout: { en: 'Callout', ar: 'تنويه' },
  list: { en: 'List', ar: 'قائمة' },
  image: { en: 'Image', ar: 'صورة' },
}

function createBlock(type: AdminContentBlock['type']): AdminContentBlock {
  switch (type) {
    case 'paragraph':
      return { type: 'paragraph', text: emptyRich() }
    case 'heading':
      return { type: 'heading', level: 2, id: `section-${Date.now().toString(36)}`, text: bi('', '') }
    case 'pullquote':
      return { type: 'pullquote', text: bi('', ''), attribution: bi('', '') }
    case 'stat':
      return { type: 'stat', value: '', label: bi('', ''), description: bi('', '') }
    case 'gallery':
      return { type: 'gallery', images: [] }
    case 'code':
      return { type: 'code', language: 'text', code: '' }
    case 'note':
      return { type: 'note', variant: 'info', title: bi('', ''), text: emptyRich() }
    case 'callout':
      return { type: 'callout', title: bi('', ''), text: emptyRich() }
    case 'list':
      return { type: 'list', ordered: false, items: [emptyRich()] }
    case 'image':
      return { type: 'image', src: '', alt: bi('', ''), caption: bi('', ''), wide: false }
  }
}

const ADD_TYPES: AdminContentBlock['type'][] = [
  'paragraph',
  'heading',
  'list',
  'image',
  'pullquote',
  'note',
  'callout',
  'stat',
  'gallery',
  'code',
]

function BlockIcon({ type }: { type: AdminContentBlock['type'] }) {
  const cls = 'h-4 w-4 text-sz-interaction'
  switch (type) {
    case 'paragraph':
      return <Type className={cls} />
    case 'heading':
      return <Heading2 className={cls} />
    case 'list':
      return <List className={cls} />
    case 'image':
      return <ImageIcon className={cls} />
    case 'gallery':
      return <Images className={cls} />
    case 'pullquote':
      return <MessageSquareQuote className={cls} />
    case 'note':
    case 'callout':
      return <NotebookPen className={cls} />
    case 'stat':
      return <Sparkles className={cls} />
    case 'code':
      return <ListOrdered className={cls} />
    default:
      return <Type className={cls} />
  }
}

function ListItemsEditor({
  items,
  onChange,
  isAr,
}: {
  items: BilingualRichText[]
  onChange: (next: BilingualRichText[]) => void
  isAr: boolean
}) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="rounded-xl border border-sz-border/80 bg-sz-surface/30 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-sz-primary/60">
              {isAr ? `عنصر ${index + 1}` : `Item ${index + 1}`}
            </span>
            <button
              type="button"
              disabled={items.length <= 1}
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              className="rounded-lg p-1.5 text-sz-primary/45 hover:bg-white hover:text-red-600 disabled:opacity-40"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <RichTextField
            label={isAr ? 'نص العنصر' : 'Item text'}
            value={item}
            minHeight={72}
            onChange={(next) => onChange(items.map((it, i) => (i === index ? next : it)))}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, emptyRich()])}
        className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-sz-border px-3 py-2 text-xs font-medium text-sz-primary/70 hover:border-sz-interaction hover:text-sz-interaction"
      >
        <Plus className="h-3.5 w-3.5" />
        {isAr ? 'إضافة عنصر' : 'Add item'}
      </button>
    </div>
  )
}

function BlockFields({
  block,
  onChange,
  isAr,
}: {
  block: AdminContentBlock
  onChange: (next: AdminContentBlock) => void
  isAr: boolean
}) {
  const inputClass =
    'w-full rounded-xl border border-sz-border bg-white px-3.5 py-2.5 text-sm outline-none focus:border-sz-interaction focus:ring-2 focus:ring-sz-interaction/20'

  switch (block.type) {
    case 'paragraph':
      return (
        <RichTextField
          label={isAr ? 'نص الفقرة' : 'Paragraph text'}
          value={block.text}
          hint={isAr ? 'يدعم الروابط' : 'Supports links'}
          onChange={(text) => onChange({ ...block, text })}
        />
      )
    case 'heading':
      return (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium">{isAr ? 'المستوى' : 'Level'}</span>
              <select
                className={inputClass}
                value={block.level}
                onChange={(e) =>
                  onChange({ ...block, level: Number(e.target.value) as 2 | 3 })
                }
              >
                <option value={2}>H2</option>
                <option value={3}>H3</option>
              </select>
            </label>
            <label className="block space-y-1.5">
              <span className="text-sm font-medium">ID (TOC / SEO)</span>
              <input
                className={inputClass}
                value={block.id}
                dir="ltr"
                onChange={(e) => onChange({ ...block, id: e.target.value })}
              />
            </label>
          </div>
          <BilingualField
            label={isAr ? 'نص العنوان' : 'Heading text'}
            value={block.text}
            onChange={(text) => {
              const nextId =
                !block.id || block.id.startsWith('section-')
                  ? slugifyHeading(text.en || text.ar)
                  : block.id
              onChange({ ...block, text, id: nextId })
            }}
          />
        </div>
      )
    case 'pullquote':
      return (
        <div className="space-y-4">
          <BilingualField
            label={isAr ? 'الاقتباس' : 'Quote'}
            value={block.text}
            multiline
            rows={3}
            onChange={(text) => onChange({ ...block, text })}
          />
          <BilingualField
            label={isAr ? 'المصدر (اختياري)' : 'Attribution (optional)'}
            value={block.attribution ?? bi('', '')}
            onChange={(attribution) => onChange({ ...block, attribution })}
          />
        </div>
      )
    case 'stat':
      return (
        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">{isAr ? 'القيمة' : 'Value'}</span>
            <input
              className={inputClass}
              value={block.value}
              dir="ltr"
              onChange={(e) => onChange({ ...block, value: e.target.value })}
            />
          </label>
          <BilingualField
            label={isAr ? 'التسمية' : 'Label'}
            value={block.label}
            onChange={(label) => onChange({ ...block, label })}
          />
          <BilingualField
            label={isAr ? 'الوصف' : 'Description'}
            value={block.description ?? bi('', '')}
            multiline
            onChange={(description) => onChange({ ...block, description })}
          />
        </div>
      )
    case 'note':
      return (
        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">{isAr ? 'النوع' : 'Variant'}</span>
            <select
              className={inputClass}
              value={block.variant}
              onChange={(e) =>
                onChange({ ...block, variant: e.target.value as 'info' | 'tip' })
              }
            >
              <option value="info">Info</option>
              <option value="tip">Tip</option>
            </select>
          </label>
          <BilingualField
            label={isAr ? 'العنوان (اختياري)' : 'Title (optional)'}
            value={block.title ?? bi('', '')}
            onChange={(title) => onChange({ ...block, title })}
          />
          <RichTextField
            label={isAr ? 'النص' : 'Body'}
            value={block.text}
            onChange={(text) => onChange({ ...block, text })}
          />
        </div>
      )
    case 'callout':
      return (
        <div className="space-y-4">
          <BilingualField
            label={isAr ? 'العنوان' : 'Title'}
            value={block.title}
            onChange={(title) => onChange({ ...block, title })}
          />
          <RichTextField
            label={isAr ? 'النص' : 'Body'}
            value={block.text}
            onChange={(text) => onChange({ ...block, text })}
          />
        </div>
      )
    case 'list':
      return (
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={block.ordered}
              onChange={(e) => onChange({ ...block, ordered: e.target.checked })}
              className="h-4 w-4 rounded border-sz-border text-sz-interaction"
            />
            {isAr ? 'قائمة مرقّمة' : 'Ordered list'}
          </label>
          <ListItemsEditor
            items={block.items}
            isAr={isAr}
            onChange={(items) => onChange({ ...block, items })}
          />
        </div>
      )
    case 'image':
      return (
        <div className="space-y-4">
          <ImageUploadField
            label={isAr ? 'الصورة' : 'Image'}
            value={block.src}
            onChange={(src) => onChange({ ...block, src })}
            aspect="wide"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={Boolean(block.wide)}
              onChange={(e) => onChange({ ...block, wide: e.target.checked })}
              className="h-4 w-4 rounded border-sz-border text-sz-interaction"
            />
            {isAr ? 'عرض عريض' : 'Wide layout'}
          </label>
          <BilingualField
            label="Alt"
            value={block.alt}
            onChange={(alt) => onChange({ ...block, alt })}
          />
          <BilingualField
            label={isAr ? 'التعليق' : 'Caption'}
            value={block.caption ?? bi('', '')}
            onChange={(caption) => onChange({ ...block, caption })}
          />
        </div>
      )
    case 'gallery':
      return (
        <div className="space-y-4">
          {block.images.map((image, index) => (
            <div key={index} className="space-y-3 rounded-xl border border-sz-border p-3">
              <div className="flex justify-between">
                <span className="text-xs font-medium text-sz-primary/60">
                  {isAr ? `صورة ${index + 1}` : `Image ${index + 1}`}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...block,
                      images: block.images.filter((_, i) => i !== index),
                    })
                  }
                  className="rounded-lg p-1.5 text-sz-primary/45 hover:bg-sz-surface hover:text-red-600"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <ImageUploadField
                label={isAr ? 'المصدر' : 'Source'}
                value={image.src}
                onChange={(src) =>
                  onChange({
                    ...block,
                    images: block.images.map((img, i) => (i === index ? { ...img, src } : img)),
                  })
                }
                aspect="wide"
              />
              <BilingualField
                label="Alt"
                value={image.alt}
                onChange={(alt) =>
                  onChange({
                    ...block,
                    images: block.images.map((img, i) => (i === index ? { ...img, alt } : img)),
                  })
                }
              />
              <BilingualField
                label={isAr ? 'التعليق' : 'Caption'}
                value={image.caption ?? bi('', '')}
                onChange={(caption) =>
                  onChange({
                    ...block,
                    images: block.images.map((img, i) =>
                      i === index ? { ...img, caption } : img,
                    ),
                  })
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              onChange({
                ...block,
                images: [...block.images, { src: '', alt: bi('', ''), caption: bi('', '') }],
              })
            }
            className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-sz-border px-3 py-2 text-xs font-medium text-sz-primary/70 hover:border-sz-interaction hover:text-sz-interaction"
          >
            <Plus className="h-3.5 w-3.5" />
            {isAr ? 'إضافة صورة' : 'Add image'}
          </button>
        </div>
      )
    case 'code':
      return (
        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">{isAr ? 'اللغة' : 'Language'}</span>
            <input
              className={inputClass}
              value={block.language}
              dir="ltr"
              onChange={(e) => onChange({ ...block, language: e.target.value })}
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">{isAr ? 'الكود' : 'Code'}</span>
            <textarea
              className={`${inputClass} font-mono`}
              rows={6}
              value={block.code}
              dir="ltr"
              onChange={(e) => onChange({ ...block, code: e.target.value })}
            />
          </label>
        </div>
      )
    default:
      return null
  }
}

export default function ArticleBlocksEditor({ blocks, onChange }: Props) {
  const { uiLocale } = useAdminContent()
  const isAr = uiLocale === 'ar'

  const updateAt = (index: number, next: AdminContentBlock) => {
    onChange(blocks.map((b, i) => (i === index ? next : b)))
  }

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir
    if (target < 0 || target >= blocks.length) return
    const copy = [...blocks]
    ;[copy[index], copy[target]] = [copy[target], copy[index]]
    onChange(copy)
  }

  const remove = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-heading text-base font-semibold text-sz-dark">
            {isAr ? 'محتوى المقال' : 'Article body'}
          </h3>
          <p className="mt-1 text-xs text-sz-primary/55">
            {isAr
              ? 'نفس هيكل الموقع: فقرات، عناوين، قوائم، صور… مع روابط للـ SEO'
              : 'Same structure as the live site: paragraphs, headings, lists, media — plus SEO links'}
          </p>
        </div>
        <span className="rounded-full bg-sz-interaction-soft px-2.5 py-1 text-[11px] font-medium text-sz-interaction">
          {blocks.length} {isAr ? 'كتلة' : 'blocks'}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {ADD_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange([...blocks, createBlock(type)])}
            className="inline-flex items-center gap-1.5 rounded-xl border border-sz-border bg-white px-2.5 py-1.5 text-xs font-medium text-sz-dark transition hover:border-sz-interaction hover:text-sz-interaction"
          >
            <Plus className="h-3 w-3" />
            {isAr ? BLOCK_LABELS[type].ar : BLOCK_LABELS[type].en}
          </button>
        ))}
      </div>

      {blocks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-sz-border bg-sz-surface/40 px-5 py-10 text-center">
          <p className="text-sm text-sz-primary/60">
            {isAr ? 'ابدأ بإضافة فقرة أو عنوان' : 'Start by adding a paragraph or heading'}
          </p>
          <button
            type="button"
            onClick={() => onChange([createBlock('paragraph'), createBlock('heading')])}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-sz-interaction px-4 py-2 text-sm font-medium text-white"
          >
            <Plus className="h-4 w-4" />
            {isAr ? 'إضافة فقرة + عنوان' : 'Add paragraph + heading'}
          </button>
        </div>
      ) : null}

      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div
            key={`${block.type}-${index}`}
            className="overflow-hidden rounded-2xl border border-sz-border bg-white"
          >
            <div className="flex items-center gap-2 border-b border-sz-border bg-sz-surface/50 px-3 py-2">
              <BlockIcon type={block.type} />
              <span className="text-sm font-medium text-sz-dark">
                {isAr ? BLOCK_LABELS[block.type].ar : BLOCK_LABELS[block.type].en}
              </span>
              <span className="text-[11px] text-sz-primary/40">#{index + 1}</span>
              <div className="ms-auto flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="rounded-lg p-1.5 text-sz-primary/50 hover:bg-white disabled:opacity-30"
                  title={isAr ? 'أعلى' : 'Move up'}
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === blocks.length - 1}
                  className="rounded-lg p-1.5 text-sz-primary/50 hover:bg-white disabled:opacity-30"
                  title={isAr ? 'أسفل' : 'Move down'}
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="rounded-lg p-1.5 text-sz-primary/50 hover:bg-white hover:text-red-600"
                  title={isAr ? 'حذف' : 'Delete'}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="space-y-4 p-4">
              <BlockFields
                block={block}
                isAr={isAr}
                onChange={(next) => updateAt(index, next)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
