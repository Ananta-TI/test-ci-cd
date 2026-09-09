import { useState } from "react"

// Tanpa `initial` = mode daftar baru (POST). Dengan `initial` = mode edit (PUT).
function UserForm({ id, initial, onSaved, onCancel }) {
  const isEdit = Boolean(initial)

  const [form, setForm] = useState({
    id,
    nama: initial?.nama ?? "",
    divisi: initial?.divisi ?? "",
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  async function save(e) {
    e.preventDefault()

    if (!form.nama.trim() || !form.divisi.trim()) {
      setError("Nama dan divisi wajib diisi")
      return
    }

    setSaving(true)
    setError(null)

    try {
      const response = await fetch(
        isEdit ? `/api/scanner/${encodeURIComponent(id)}` : "/api/scanner",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      )

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setError(data.message || "Gagal menyimpan data")
        return
      }

      onSaved?.(data)
    } catch {
      setError("Tidak dapat terhubung ke server")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form
      onSubmit={save}
      className="glass p-6 space-y-4"
    >
      <div>
        <h2 className="text-lg font-semibold text-ink mb-1">
          {isEdit ? "Ubah Data Kartu" : "Data belum terdaftar"}
        </h2>
        <p className="text-sm text-body">
          {isEdit ? (
            <>
              Perbarui data untuk ID <span className="font-mono">{id}</span>.
            </>
          ) : (
            <>
              ID <span className="font-mono">{id}</span> belum ada. Lengkapi data berikut untuk mendaftarkannya.
            </>
          )}
        </p>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-ink">ID (dari scan)</span>
        <input
          className="
            mt-1 block w-full
            rounded-lg border border-line
            bg-canvas-soft-2
            px-3 py-2.5
            text-sm text-body
            font-mono
          "
          value={form.id}
          readOnly
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">Nama</span>
        <input
          className="
            mt-1 block w-full
            rounded-lg border border-line
            bg-canvas
            px-3 py-2.5
            text-sm text-ink
            outline-none
            transition-colors
            focus:border-link
          "
          placeholder="Nama lengkap"
          value={form.nama}
          autoFocus
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-ink">Divisi</span>
        <input
          className="
            mt-1 block w-full
            rounded-lg border border-line
            bg-canvas
            px-3 py-2.5
            text-sm text-ink
            outline-none
            transition-colors
            focus:border-link
          "
          placeholder="Divisi / departemen"
          value={form.divisi}
          onChange={(e) => setForm({ ...form, divisi: e.target.value })}
        />
      </label>

      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn--ghost btn--sm flex-1"
          >
            Batal
          </button>
        )}
        <button
          type="submit"
          disabled={saving}
          className="btn btn--primary btn--sm flex-1 disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : isEdit ? "Simpan Perubahan" : "Simpan Data"}
        </button>
      </div>
    </form>
  )
}

export default UserForm
