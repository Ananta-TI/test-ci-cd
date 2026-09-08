import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useLanding } from '../context/LandingContext'

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
)

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'features', label: 'Features' },
  { id: 'steps', label: 'Steps' },
  { id: 'cta', label: 'CTA' },
  { id: 'navbar', label: 'Navbar' },
  { id: 'footer', label: 'Footer' },
]

function Input({ label, value, onChange, textarea }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {textarea ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-link"
          rows={3}
        />
      ) : (
        <input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-link"
        />
      )}
    </label>
  )
}

function HeroEditor({ data, onChange }) {
  const update = (key, val) => onChange({ ...data, [key]: val })
  const updateStat = (i, key, val) => {
    const stats = [...data.stats]
    stats[i] = { ...stats[i], [key]: val }
    update('stats', stats)
  }
  const addStat = () => update('stats', [...data.stats, { value: '', label: '' }])
  const removeStat = (i) => update('stats', data.stats.filter((_, j) => j !== i))

  return (
    <div className="space-y-4">
      <Input label="Badge Text" value={data.badge} onChange={(v) => update('badge', v)} />
      <Input label="Title (gunakan <gradient>text</gradient> untuk gradient)" value={data.title} onChange={(v) => update('title', v)} textarea />
      <Input label="Description" value={data.description} onChange={(v) => update('description', v)} textarea />
      <div className="grid grid-cols-2 gap-3">
        <Input label="CTA Primary Label" value={data.ctaPrimary?.label} onChange={(v) => update('ctaPrimary', { ...data.ctaPrimary, label: v })} />
        <Input label="CTA Primary Href" value={data.ctaPrimary?.href} onChange={(v) => update('ctaPrimary', { ...data.ctaPrimary, href: v })} />
        <Input label="CTA Secondary Label" value={data.ctaSecondary?.label} onChange={(v) => update('ctaSecondary', { ...data.ctaSecondary, label: v })} />
        <Input label="CTA Secondary Href" value={data.ctaSecondary?.href} onChange={(v) => update('ctaSecondary', { ...data.ctaSecondary, href: v })} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-ink">Stats</span>
          <button onClick={addStat} className="text-xs text-link hover:underline">+ Tambah</button>
        </div>
        {data.stats?.map((s, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-2">
            <input value={s.value} onChange={(e) => updateStat(i, 'value', e.target.value)} placeholder="Value" className="rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-link" />
            <input value={s.label} onChange={(e) => updateStat(i, 'label', e.target.value)} placeholder="Label" className="rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-link" />
            <button onClick={() => removeStat(i)} className="text-xs text-error hover:underline px-2">Hapus</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeaturesEditor({ data, onChange }) {
  const updateField = (key, val) => onChange({ ...data, [key]: val })
  const updateItem = (i, key, val) => {
    const items = [...data.items]
    items[i] = { ...items[i], [key]: val }
    updateField('items', items)
  }
  const addItem = () => updateField('items', [...data.items, { icon: '', title: '', desc: '' }])
  const removeItem = (i) => updateField('items', data.items.filter((_, j) => j !== i))

  return (
    <div className="space-y-4">
      <Input label="Eyebrow" value={data.eyebrow} onChange={(v) => updateField('eyebrow', v)} />
      <Input label="Title" value={data.title} onChange={(v) => updateField('title', v)} />
      <Input label="Description" value={data.description} onChange={(v) => updateField('description', v)} textarea />
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink">Items ({data.items?.length})</span>
        <button onClick={addItem} className="text-xs text-link hover:underline">+ Tambah Fitur</button>
      </div>
      {data.items?.map((item, i) => (
        <div key={i} className="rounded-lg border border-line p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-body">Fitur {i + 1}</span>
            <button onClick={() => removeItem(i)} className="text-xs text-error hover:underline">Hapus</button>
          </div>
          <div className="grid grid-cols-[60px_1fr] gap-2">
            <input value={item.icon} onChange={(e) => updateItem(i, 'icon', e.target.value)} placeholder="Icon" className="rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-link text-center" />
            <input value={item.title} onChange={(e) => updateItem(i, 'title', e.target.value)} placeholder="Title" className="rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-link" />
          </div>
          <textarea value={item.desc} onChange={(e) => updateItem(i, 'desc', e.target.value)} placeholder="Description" rows={2} className="block w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-link" />
        </div>
      ))}
    </div>
  )
}

function StepsEditor({ data, onChange }) {
  const updateField = (key, val) => onChange({ ...data, [key]: val })
  const updateItem = (i, key, val) => {
    const items = [...data.items]
    items[i] = { ...items[i], [key]: val }
    updateField('items', items)
  }
  const addItem = () => updateField('items', [...data.items, { num: String(data.items?.length + 1 || 1).padStart(2, '0'), title: '', desc: '' }])
  const removeItem = (i) => updateField('items', data.items.filter((_, j) => j !== i))

  return (
    <div className="space-y-4">
      <Input label="Eyebrow" value={data.eyebrow} onChange={(v) => updateField('eyebrow', v)} />
      <Input label="Title" value={data.title} onChange={(v) => updateField('title', v)} />
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink">Steps ({data.items?.length})</span>
        <button onClick={addItem} className="text-xs text-link hover:underline">+ Tambah Step</button>
      </div>
      {data.items?.map((item, i) => (
        <div key={i} className="rounded-lg border border-line p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-body">Step {i + 1}</span>
            <button onClick={() => removeItem(i)} className="text-xs text-error hover:underline">Hapus</button>
          </div>
          <div className="grid grid-cols-[60px_1fr] gap-2">
            <input value={item.num} onChange={(e) => updateItem(i, 'num', e.target.value)} placeholder="Num" className="rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-link text-center" />
            <input value={item.title} onChange={(e) => updateItem(i, 'title', e.target.value)} placeholder="Title" className="rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-link" />
          </div>
          <input value={item.desc} onChange={(e) => updateItem(i, 'desc', e.target.value)} placeholder="Description" className="block w-full rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-link" />
        </div>
      ))}
    </div>
  )
}

function CtaEditor({ data, onChange }) {
  const update = (key, val) => onChange({ ...data, [key]: val })
  return (
    <div className="space-y-4">
      <Input label="Title" value={data.title} onChange={(v) => update('title', v)} />
      <Input label="Description" value={data.description} onChange={(v) => update('description', v)} textarea />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Button Label" value={data.button?.label} onChange={(v) => update('button', { ...data.button, label: v })} />
        <Input label="Button Href" value={data.button?.href} onChange={(v) => update('button', { ...data.button, href: v })} />
      </div>
    </div>
  )
}

function NavbarEditor({ data, onChange }) {
  const update = (key, val) => onChange({ ...data, [key]: val })
  const updateLink = (i, key, val) => {
    const links = [...data.links]
    links[i] = { ...links[i], [key]: val }
    update('links', links)
  }
  const addLink = () => update('links', [...data.links, { label: '', href: '' }])
  const removeLink = (i) => update('links', data.links.filter((_, j) => j !== i))

  return (
    <div className="space-y-4">
      <Input label="Brand Name" value={data.brand} onChange={(v) => update('brand', v)} />
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink">Nav Links</span>
        <button onClick={addLink} className="text-xs text-link hover:underline">+ Tambah Link</button>
      </div>
      {data.links?.map((l, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
          <input value={l.label} onChange={(e) => updateLink(i, 'label', e.target.value)} placeholder="Label" className="rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-link" />
          <input value={l.href} onChange={(e) => updateLink(i, 'href', e.target.value)} placeholder="Href" className="rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-link" />
          <button onClick={() => removeLink(i)} className="text-xs text-error hover:underline px-2">Hapus</button>
        </div>
      ))}
    </div>
  )
}

function FooterEditor({ data, onChange }) {
  const update = (key, val) => onChange({ ...data, [key]: val })
  const updateCol = (i, key, val) => {
    const columns = [...data.columns]
    columns[i] = { ...columns[i], [key]: val }
    update('columns', columns)
  }
  const updateColLink = (colI, linkI, key, val) => {
    const columns = [...data.columns]
    const links = [...columns[colI].links]
    links[linkI] = { ...links[linkI], [key]: val }
    columns[colI] = { ...columns[colI], links }
    update('columns', columns)
  }
  const addColLink = (colI) => {
    const columns = [...data.columns]
    columns[colI] = { ...columns[colI], links: [...columns[colI].links, { label: '', href: '' }] }
    update('columns', columns)
  }
  const removeColLink = (colI, linkI) => {
    const columns = [...data.columns]
    columns[colI] = { ...columns[colI], links: columns[colI].links.filter((_, j) => j !== linkI) }
    update('columns', columns)
  }

  return (
    <div className="space-y-4">
      <Input label="About" value={data.about} onChange={(v) => update('about', v)} textarea />
      <Input label="Bottom Text" value={data.bottom} onChange={(v) => update('bottom', v)} />
      <Input label="Location" value={data.location} onChange={(v) => update('location', v)} />
      {data.columns?.map((col, i) => (
        <div key={i} className="rounded-lg border border-line p-3 space-y-2">
          <div className="flex items-center justify-between">
            <input value={col.title} onChange={(e) => updateCol(i, 'title', e.target.value)} placeholder="Column Title" className="text-sm font-medium text-ink bg-transparent outline-none border-b border-line" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-body">Links ({col.links?.length})</span>
            <button onClick={() => addColLink(i)} className="text-xs text-link hover:underline">+ Tambah</button>
          </div>
          {col.links?.map((l, j) => (
            <div key={j} className="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input value={l.label} onChange={(e) => updateColLink(i, j, 'label', e.target.value)} placeholder="Label" className="rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-link" />
              <input value={l.href} onChange={(e) => updateColLink(i, j, 'href', e.target.value)} placeholder="Href" className="rounded-lg border border-line bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-link" />
              <button onClick={() => removeColLink(i, j)} className="text-xs text-error hover:underline px-2">Hapus</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const editors = {
  hero: HeroEditor,
  features: FeaturesEditor,
  steps: StepsEditor,
  cta: CtaEditor,
  navbar: NavbarEditor,
  footer: FooterEditor,
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { landing, updateSection } = useLanding()
  const [activeTab, setActiveTab] = useState('hero')
  const [editData, setEditData] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const currentData = editData !== null ? editData : landing[activeTab]
  const hasChanges = JSON.stringify(editData) !== JSON.stringify(landing[activeTab])

  const handleTabChange = (tabId) => {
    if (hasChanges && !window.confirm('Ada perubahan yang belum disimpan. Lanjutkan?')) return
    setActiveTab(tabId)
    setEditData(null)
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateSection(activeTab, editData)
      setEditData(null)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const Editor = editors[activeTab]

  return (
    <div className="min-h-svh bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="h-7 w-7" />
            <span className="text-[15px] font-semibold tracking-[-0.02em]">Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label={`Ubah ke mode ${theme === 'dark' ? 'terang' : 'gelap'}`}
              className="grid h-8 w-8 place-items-center rounded-full border border-line bg-canvas text-body transition-colors hover:text-ink"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-ink">{user?.name}</p>
                <p className="text-xs text-body">{user?.email}</p>
              </div>
              <button onClick={logout} className="btn btn--ghost btn--sm">Keluar</button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-8">
          <h1 className="display text-3xl">Selamat datang, {user?.name?.split(' ')[0]}!</h1>
          <p className="mt-2 text-body">Kelola konten landing page dari sini.</p>
        </div>

        <div className="glass">
          {/* Tabs */}
          <div className="flex gap-1 border-b border-line p-2 overflow-x-auto">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => handleTabChange(s.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === s.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-body hover:text-ink hover:bg-canvas-soft-2'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Editor */}
          <div className="p-6">
            <Editor data={currentData} onChange={(v) => { setEditData(v); setSaved(false) }} />
          </div>

          {/* Save Bar */}
          {hasChanges && (
            <div className="sticky bottom-0 border-t border-line bg-canvas/90 backdrop-blur-md p-4 flex items-center justify-between">
              <span className="text-sm text-body">Ada perubahan yang belum disimpan</span>
              <div className="flex gap-2">
                <button onClick={() => setEditData(null)} className="btn btn--ghost btn--sm">Batal</button>
                <button onClick={handleSave} disabled={saving} className="btn btn--primary btn--sm">
                  {saving ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </div>
          )}

          {saved && (
            <div className="border-t border-line p-4 text-center text-sm text-success">
              ✓ Berhasil disimpan
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
