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
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' });
    const filename = 'Vivek_Shah_Bhumita_Petrochem.vcf';

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isIOS && isSafari) {
      const reader = new FileReader();
      reader.onload = () => {
        const link = document.createElement('a');
        link.href = reader.result;
        link.download = filename;
        link.click();
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    }
  };

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
          <div className="absolute top-0 right-0 w-1/3 md:w-1/4 h-full opacity-30 pointer-events-none">
            <svg viewBox="0 0 200 500" className="h-full" preserveAspectRatio="none">
              <path
                d="M200,0 Q80,125 150,250 Q220,375 100,500 L200,500 L200,0 Z"
                fill="#1565C0"
              />
            </svg>
          </div>

          <div className="text-center mb-10 relative z-10">
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-wide mb-2">
              Vivek Shah
            </h2>
            <p className="text-blue-200 text-lg">Director</p>
          </div>

          <div className="space-y-5 relative z-10">
            <a href="tel:+918828888283" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors">
              <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" alt="Phone" className="w-6 h-6 object-contain" />
              <span className="text-base">+91 882-8888-283</span>
            </a>

            <a href="mailto:info@bhumitapetrochem.com" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors">
              <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" className="w-6 h-6 object-contain" />
              <span className="text-base">info@bhumitapetrochem.com</span>
            </a>

            <div className="flex items-center gap-4 text-white">
              <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Location" className="w-6 h-6 object-contain" />
              <span className="text-base">Mumbai, India</span>
            </div>

            <a href="https://wa.me/918828888283" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="w-6 h-6 object-contain" />
              <span className="text-base">+91 882-8888-283</span>
            </a>

            <a href="https://www.instagram.com/bhumitapetrochem" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors">
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-6 h-6 object-contain" />
              <span className="text-base">@bhumitapetrochem</span>
            </a>

            <a href="https://bhumitapetrochem.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors">
              <img src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png" alt="Website" className="w-6 h-6 object-contain" />
              <span className="text-base">bhumitapetrochem.com</span>
            </a>
          </div>

          <button
            onClick={downloadVCard}
            className="relative mx-auto mt-8 block w-28 h-28 bg-white rounded-lg p-1.5 cursor-pointer hover:shadow-lg hover:scale-105 transition-all active:scale-95 z-20 md:absolute md:bottom-10 md:right-6"
            title="Tap to save contact"
          >
            <img
              src="https://customer-assets.emergentagent.com/job_visitcard-hub/artifacts/py45ho5h_image.png"
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
  );
}
