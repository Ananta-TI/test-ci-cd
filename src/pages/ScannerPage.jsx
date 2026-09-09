import USBScanner from "../components/scanner/USBScanner";


function ScannerPage(){

  return (

    <div className="
      min-h-screen
      bg-bg
      p-6
      md:p-10
    ">

      <div className="
        max-w-5xl
        mx-auto
      ">

        <h1 className="
          text-3xl
          font-bold
          mb-2
        ">
          USB Scanner
        </h1>


        <p className="
          text-body
          mb-8
        ">
          Scan RFID atau barcode untuk mencari data pengguna. Hasil scan tampil
          sebagai modal — bahkan saat kamu sedang di halaman lain.
        </p>


        <USBScanner />


      </div>


    </div>

  )

}


export default ScannerPage;