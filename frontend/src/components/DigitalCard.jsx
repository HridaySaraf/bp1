export default function DigitalCard() {
  // Download vCard - Works on Android, iPhone, Desktop
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
      'URL:[bhumitapetrochem.com](https://bhumitapetrochem.com)',
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
        
        {/* ===== TOP SECTION - White Background ===== */}
        <div className="bg-white px-8 pt-12 pb-10 flex flex-col items-center text-center">
          {/* Logo */}
          <div className="w-32 h-32 mb-6">
            <img 
              src="[customer-assets.emergentagent.com](https://customer-assets.emergentagent.com/job_visitcard-hub/artifacts/8az27j1r_bHumika%20logo.png)" 
              alt="Bhumita Petrochem Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Company Name */}
          <h1 className="text-[#0B3D91] text-3xl font-bold tracking-wide mb-3">
            BHUMITA PETROCHEM
          </h1>

          {/* Tagline */}
          <p className="text-[#0B3D91] text-base italic mb-8">
            Where purity meets performance
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-8 w-48">
            <div className="flex-1 h-0.5 bg-[#0B3D91]" />
            <div className="w-2 h-2 rotate-45 bg-[#0B3D91]" />
            <div className="flex-1 h-0.5 bg-[#0B3D91]" />
          </div>

          {/* Business Description */}
          <p className="text-[#0B3D91] text-base font-medium">
            Suppliers of all brands of Diesel Exhaust Fluid (D.E.F.) AdBlue
          </p>
        </div>

        {/* ===== CURVED TRANSITION ===== */}
        <div className="relative h-20 bg-white">
          <svg 
            viewBox="0 0 400 80" 
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,80 L0,50 Q100,10 200,30 Q300,50 400,20 L400,80 Z" 
              fill="#0B3D91"
            />
            <path 
              d="M0,80 L0,60 Q100,30 200,45 Q300,60 400,35 L400,80 Z" 
              fill="#1565C0"
            />
          </svg>
        </div>

        {/* ===== BOTTOM SECTION - Blue Background ===== */}
        <div className="bg-[#0B3D91] px-8 pt-8 pb-20 md:pb-12 flex-1 relative">
          {/* Decorative curved accent */}
          <div className="absolute top-0 right-0 w-1/3 md:w-1/4 h-full overflow-hidden pointer-events-none opacity-30">
            <svg viewBox="0 0 200 500" className="h-full" preserveAspectRatio="none">
              <path d="M200,0 Q80,125 150,250 Q220,375 100,500 L200,500 L200,0 Z" fill="#1565C0"/>
            </svg>
          </div>

          {/* Contact Person */}
          <div className="text-center mb-10 relative z-10">
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-wide mb-2">
              Vivek Shah
            </h2>
            <p className="text-blue-200 text-lg">Director</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-5 relative z-10">
            {/* Phone - Blue Icon */}
            <a 
              href="tel:+918828888283"
              className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" fill="#4FC3F7"/>
              </svg>
              <span className="text-base">+91 882-8888-283</span>
            </a>

            {/* Email - Red/Orange Icon */}
            <a 
              href="mailto:info@bhumitapetrochem.com"
              className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" fill="#EA4335"/>
                <path d="M22 6L12 13 2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-base">info@bhumitapetrochem.com</span>
            </a>

            {/* Location - Red Pin Icon */}
            <div className="flex items-center gap-4 text-white">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#F44336"/>
                <circle cx="12" cy="9" r="2.5" fill="white"/>
              </svg>
              <span className="text-base">Mumbai, India</span>
            </div>

            {/* WhatsApp - Green Icon */}
            <a 
              href="[wa.me](https://wa.me/918828888283)"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M12.04 2C6.52 2 2.04 6.48 2.04 12c0 1.77.46 3.49 1.34 5L2 22l5.13-1.34A9.94 9.94 0 0012.04 22C17.56 22 22.04 17.52 22.04 12S17.56 2 12.04 2z" fill="#25D366"/>
                <path d="M16.75 13.96c.25.13 1.47.72 1.69.85.23.11.38.17.44.27.05.11.05.62-.14 1.22-.2.59-1.13 1.16-1.56 1.22-.4.06-.91.09-1.47-.09-.34-.11-.78-.25-1.34-.49-2.36-1.02-3.9-3.39-4.02-3.55-.11-.17-.96-1.28-.96-2.44 0-1.16.61-1.73.82-1.97.22-.25.48-.31.65-.31.16 0 .33 0 .47.01.15 0 .35-.06.55.42.19.47.65 1.63.71 1.75.05.13.09.27.02.44-.07.16-.11.27-.22.41-.11.13-.23.29-.33.39-.11.11-.22.23-.09.45.13.22.58.95 1.24 1.53.86.77 1.58 1.01 1.8 1.12.22.11.35.09.48-.05.13-.14.55-.64.69-.86.15-.22.29-.18.49-.11z" fill="white"/>
              </svg>
              <span className="text-base">+91 882-8888-283</span>
            </a>

            {/* Instagram - Gradient Icon */}
            <a 
              href="[instagram.com](https://www.instagram.com/bhumitapetrochem)"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="instagramGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFDC80"/>
                    <stop offset="25%" stopColor="#F77737"/>
                    <stop offset="50%" stopColor="#E1306C"/>
                    <stop offset="75%" stopColor="#C13584"/>
                    <stop offset="100%" stopColor="#833AB4"/>
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#instagramGradient)"/>
                <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" fill="none"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
              </svg>
              <span className="text-base">@bhumitapetrochem</span>
            </a>

            {/* Website - Globe Icon */}
            <a 
              href="[bhumitapetrochem.com](https://bhumitapetrochem.com)"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#4285F4"/>
                <ellipse cx="12" cy="12" rx="4" ry="10" stroke="white" strokeWidth="1.5" fill="none"/>
                <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.5"/>
                <path d="M4 7h16M4 17h16" stroke="white" strokeWidth="1" opacity="0.7"/>
              </svg>
              <span className="text-base">bhumitapetrochem.com</span>
            </a>
          </div>

          {/* QR Code - Clickable to Save Contact */}
          <button 
            onClick={downloadVCard}
            className="relative mx-auto mt-8 block w-28 h-28 bg-white rounded-lg p-1.5 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95 z-20 md:absolute md:bottom-10 md:right-6 md:mx-0 md:mt-0"
            title="Tap to save contact"
          >
            <img 
              src="[customer-assets.emergentagent.com](https://customer-assets.emergentagent.com/job_visitcard-hub/artifacts/py45ho5h_image.png)"
              alt="Tap to save contact"
              className="w-full h-full object-contain"
            />
          </button>
          <p className="text-[10px] text-white text-center mt-2 md:absolute md:bottom-3 md:right-6 md:w-28 whitespace-nowrap">
            Tap QR to Save Contact
          </p>
        </div>
      </div>
    </div>
  )
}
