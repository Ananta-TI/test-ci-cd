import { useEffect, useRef, useState } from "react"

import { useScan } from "../../context/ScanContext"

function USBScanner() {
  const inputRef = useRef(null)
  const { submitScan, loading } = useScan()

  const [code, setCode] = useState("")

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const id = code.trim()
    if (!id || loading) return
    setCode("")
    submitScan(id)
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="glass p-6">
      <label htmlFor="scan-input" className="block text-sm font-medium text-ink mb-2">
        Scan RFID / Barcode
      </label>

      <input
        id="scan-input"
        ref={inputRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={loading}
        className="
          w-full
          rounded-lg
          border border-line
          bg-canvas
          px-4 py-3
          text-lg text-ink
          font-mono
          outline-none
          transition-colors
          focus:border-link
          disabled:opacity-50
        "
        placeholder="Arahkan scanner, kartu akan terbaca otomatis..."
      />

      <p className="mt-2 text-xs text-body">
        Scanner USB otomatis mengisi kolom ini. Bisa juga ketik manual lalu Enter —
        atau scan langsung di halaman mana pun tanpa membuka halaman ini.
      </p>
    </form>
  )
}

export default USBScanner
