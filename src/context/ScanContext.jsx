/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import ScanResult from "../components/scanner/ScanResult"
import UserForm from "../components/scanner/UserForm"

const ScanContext = createContext(null)

const BUFFER_WINDOW_MS = 100 // keystroke dari scanner datang beruntun

// Abaikan keystroke saat user sedang mengetik di input/form
function isEditableTarget(el) {
  if (!el) return false
  const tag = el.tagName
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable
  )
}

export function ScanProvider({ children }) {
  const bufferRef = useRef([])
  const timerRef = useRef(null)

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null) // data user | { new: true, id }
  const [error, setError] = useState(null)

  const closeModal = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  const submitScan = useCallback(async (rawId) => {
    const id = String(rawId || "").trim()
    if (!id) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/scanner/${encodeURIComponent(id)}`)

      if (response.ok) {
        setResult(await response.json())
      } else if (response.status === 404) {
        // Kartu belum terdaftar — buka form pendaftaran
        setResult({ new: true, id })
      } else {
        const data = await response.json().catch(() => ({}))
        setError(data.message || "Gagal memuat data")
      }
    } catch {
      setError("Tidak dapat terhubung ke server")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    function flush() {
      const id = bufferRef.current.join("")
      bufferRef.current = []
      if (id) submitScan(id)
    }

    function onKeyDown(e) {
      // Kalau modal sedang terbuka, Enter di dalam form modal jangan di-buffer
      if (e.key === "Enter") return

      if (isEditableTarget(e.target)) return

      // Hanya karakter yang masuk akal untuk ID kartu
      if (e.key.length === 1 && /[A-Za-z0-9_-]/.test(e.key)) {
        bufferRef.current.push(e.key)
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(flush, BUFFER_WINDOW_MS)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      clearTimeout(timerRef.current)
    }
  }, [submitScan])

  // Tutup modal dengan Escape
  useEffect(() => {
    if (result === null && !error) return
    function onKey(e) {
      if (e.key === "Escape") closeModal()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [result, error, closeModal])

  const value = useMemo(
    () => ({ submitScan, loading, result, error, closeModal, setResult }),
    [submitScan, loading, result, error, closeModal]
  )

  return (
    <ScanContext.Provider value={value}>
      {children}
      <ScanModal />
    </ScanContext.Provider>
  )
}

function ScanModal() {
  const { result, error, loading, closeModal, setResult } = useScan()

  // Mode edit ditandai dengan identitas objek result: kalau result berganti
  // (scan baru / hasil simpan), otomatis kembali ke mode lihat tanpa effect.
  const [editingTarget, setEditingTarget] = useState(null)
  const isEditing = Boolean(result && !result?.new && editingTarget === result)

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 grid place-items-center bg-black/50 p-4 backdrop-blur-sm">
        <div className="glass px-8 py-6 text-sm text-body">Membaca kartu...</div>
      </div>
    )
  }

  if (!result && !error) return null

  return (
    <div
      className="
        fixed inset-0 z-100
        grid place-items-center
        bg-black/50
        p-4
        backdrop-blur-sm
      "
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="
          glass
          w-full
          max-w-md
          max-h-[90svh]
          overflow-y-auto
          p-6
          shadow-float
        "
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <span className="eyebrow">Hasil Scan</span>
          <button
            onClick={closeModal}
            aria-label="Tutup"
            className="
              grid h-8 w-8 shrink-0
              place-items-center
              rounded-full border
              border-line bg-canvas
              text-body transition-colors
              hover:text-ink
            "
          >
            ✕
          </button>
        </div>

        {error && (
          <p role="alert" className="text-sm text-error">
            {error}
          </p>
        )}

        {result?.new ? (
          <UserForm id={result.id} onSaved={(data) => setResult(data)} />
        ) : isEditing ? (
          <UserForm
            id={result.id}
            initial={result}
            onSaved={(data) => {
              setEditingTarget(null)
              setResult(data)
            }}
            onCancel={() => setEditingTarget(null)}
          />
        ) : (
          result && (
            <ScanResult
              data={result}
              onEdit={() => setEditingTarget(result)}
            />
          )
        )}
      </div>
    </div>
  )
}

export function useScan() {
  const ctx = useContext(ScanContext)
  if (!ctx) throw new Error("useScan must be used within <ScanProvider>")
  return ctx
}
