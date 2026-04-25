export default function DigitalCard() {
  const downloadVCard = () => {
    const vCard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Shah;Vivek;;;',
      'FN:Vivek Shah',
      'ORG:BHUMITA PETROCHEM',
      'TITLE:Director',
      'TEL;TYPE=CELL:+918828888283',
      'TEL;TYPE=WORK:+918828888283',
      'EMAIL;TYPE=WORK:info@bhumitapetrochem.com',
      'URL:https://bhumitapetrochem.com',
      'ADR;TYPE=WORK:;;Mumbai;;Maharashtra;;India',
      'NOTE:Where purity meets performance - Suppliers of all brands of Diesel Exhaust Fluid (D.E.F.) AdBlue',
      'END:VCARD'
    ].join('\r\n')

    const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' })
    const filename = 'Vivek_Shah_Bhumita_Petrochem.vcf'

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

    if (isIOS && isSafari) {
      const reader = new FileReader()
      reader.onload = () => {
        const link = document.createElement('a')
        link.href = reader.result
        link.download = filename
        link.click()
      }
      reader.readAsDataURL(blob)
    } else {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      setTimeout(() => {
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }, 100)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-2xl">

        <div className="bg-white px-8 pt-12 pb-10 flex flex-col items-center text-center">
          <div className="w-32 h-32 mb-6">
            <img
              src="https://customer-assets.emergentagent.com/job_visitcard-hub/artifacts/8az27j1r_bHumika%20logo.png"
              alt="Bhumita Petrochem Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="text-[#0B3D91] text-3xl font-bold tracking-wide mb-3">
            BHUMITA PETROCHEM
          </h1>

          <p className="text-[#0B3D91] text-base italic mb-8">
            Where purity meets performance
          </p>

          <div className="flex items-center gap-3 mb-8 w-48">
            <div className="flex-1 h-0.5 bg-[#0B3D91]" />
            <div className="w-2 h-2 rotate-45 bg-[#0B3D91]" />
            <div className="flex-1 h-0.5 bg-[#0B3D91]" />
          </div>

          <p className="text-[#0B3D91] text-base font-medium">
            Suppliers of all brands of Diesel Exhaust Fluid (D.E.F.) AdBlue
          </p>
        </div>

        <div className="relative h-20 bg-white">
          <svg
            viewBox="0 0 400 80"
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <path d="M0,80 L0,50 Q100,10 200,30 Q300,50 400,20 L400,80 Z" fill="#0B3D91" />
            <path d="M0,80 L0,60 Q100,30 200,45 Q300,60 400,35 L400,80 Z" fill="#1565C0" />
          </svg>
        </div>

        <div className="bg-[#0B3D91] px-8 pt-8 pb-20 md:pb-12 flex-1 relative">
          <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none opacity-30">
            <svg viewBox="0 0 200 500" className="h-full" preserveAspectRatio="none">
              <path d="M200,0 Q80,125 150,250 Q220,375 100,500 L200,500 L200,0 Z" fill="#1565C0" />
            </svg>
          </div>

          <div className="text-center mb-10 relative z-10">
            <h2 className="text-white text-3xl font-bold mb-2">Vivek Shah</h2>
            <p className="text-blue-200 text-lg">Director</p>
          </div>

          <div className="space-y-5 relative z-10">
            <a href="tel:+918828888283" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors">
              <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span className="text-base">+91 882-8888-283</span>
            </a>

            <a href="mailto:info@bhumitapetrochem.com" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors">
              <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span className="text-base">info@bhumitapetrochem.com</span>
            </a>

            <div className="flex items-center gap-4 text-white">
              <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-base">Mumbai, India</span>
            </div>

            <a href="https://www.instagram.com/bhumitapetrochem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors">
              <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
              </svg>
              <span className="text-base">@bhumitapetrochem</span>
            </a>

            <a href="https://bhumitapetrochem.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors">
              <svg className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93..." />
              </svg>
              <span className="text-base">bhumitapetrochem.com</span>
            </a>
          </div>

          <button
            onClick={downloadVCard}
            className="relative mx-auto mt-8 block w-28 h-28 bg-white rounded-lg p-1.5 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95 z-20 md:absolute md:bottom-6 md:right-6 md:mx-0 md:mt-0"
            title="Tap to save contact"
          >
            <img
              src="https://customer-assets.emergentagent.com/job_visitcard-hub/artifacts/py45ho5h_image.png"
              alt="Tap to save contact"
              className="w-full h-full object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
