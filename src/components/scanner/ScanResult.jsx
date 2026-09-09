function ScanResult({ data, onEdit }) {
  return (
    <div className="glass p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-2 w-2 rounded-full bg-success" />
        <h2 className="text-lg font-semibold text-ink">Data ditemukan</h2>
      </div>

      <dl className="space-y-2">
        <div className="flex justify-between gap-4">
          <dt className="text-sm text-body">ID</dt>
          <dd className="text-sm font-medium text-ink font-mono">{data.id}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-sm text-body">Nama</dt>
          <dd className="text-sm font-medium text-ink">{data.nama}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-sm text-body">Divisi</dt>
          <dd className="text-sm font-medium text-ink">{data.divisi}</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-body">
        Terakhir diubah:{' '}
        {data.updated_at
          ? new Date(data.updated_at).toLocaleString('id-ID')
          : '-'}
      </p>

      {onEdit && (
        <button
          onClick={onEdit}
          className="btn btn--ghost btn--sm w-full mt-4"
        >
          ✏️ Ubah Data
        </button>
      )}
    </div>
  )
}

export default ScanResult
