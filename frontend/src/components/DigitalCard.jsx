import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa6'
import { MapPin, Globe, Download, Share2, Check, X, QrCode } from 'lucide-react'

// Contact Information - Vivek Shah
const CONTACT = {
  name: 'Vivek Shah',
  title: 'Director',
  company: 'BHUMITA PETROCHEM',
  tagline: 'Where purity meets performance',
  businessDescription: 'Suppliers of all brands of Diesel Exhaust Fluid (D.E.F.) AdBlue',
  phone: '+91 882-8888-283',
  phoneClean: '918828888283',
  email: 'info@bhumitapetrochem.com',
  website: 'bhumitapetrochem.com',
  instagram: 'bhumitapetrochem',
  instagramUrl: 'https://www.instagram.com/bhumitapetrochem',
  location: 'Mumbai, India',
  logo: 'https://customer-assets.emergentagent.com/job_visitcard-hub/artifacts/zqt8r0fa_image.png',
}

// Generate vCard - Cross-platform compatible
const generateVCard = () => {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${CONTACT.name.split(' ').reverse().join(';')};;;`,
    `FN:${CONTACT.name}`,
    `ORG:${CONTACT.company}`,
    `TITLE:${CONTACT.title}`,
    `TEL;TYPE=CELL:+${CONTACT.phoneClean}`,
    `TEL;TYPE=WORK:+${CONTACT.phoneClean}`,
    `EMAIL;TYPE=WORK:${CONTACT.email}`,
    `URL:https://${CONTACT.website}`,
    `ADR;TYPE=WORK:;;Mumbai;;Maharashtra;;India`,
    `NOTE:${CONTACT.tagline} - ${CONTACT.businessDescription}`,
    'END:VCARD'
  ].join('\r\n')
}

// Toast Component
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.9 }}
    className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-lg"
  >
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
      {type === 'success' ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}
    </div>
    <p className="text-sm font-medium text-gray-900">{message}</p>
    <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600">
      <X className="w-4 h-4" />
    </button>
  </motion.div>
)

export default function DigitalCard() {
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Download vCard - Works on Android, iPhone, Desktop
  const downloadVCard = () => {
    try {
      const vCardContent = generateVCard()
      const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' })
      const filename = `${CONTACT.name.replace(/\s+/g, '_')}_Bhumita_Petrochem.vcf`
      
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      
      if (isIOS && isSafari) {
        const reader = new FileReader()
        reader.onload = () => {
          const link = document.createElement('a')
          link.href = reader.result
          link.download = filename
          link.click()
          showToast('Contact ready to save!')
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
        showToast('Contact saved!')
      }
    } catch (error) {
      showToast('Could not save contact', 'error')
    }
  }

  // Share card - Cross-platform
  const shareCard = async () => {
    const shareUrl = window.location.href
    const shareData = {
      title: `${CONTACT.name} - ${CONTACT.company}`,
      text: `Digital Business Card for ${CONTACT.name}, ${CONTACT.title} at ${CONTACT.company}`,
      url: shareUrl,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        showToast('Shared successfully!')
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl)
        showToast('Link copied!')
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = shareUrl
        textArea.style.cssText = 'position:fixed;opacity:0'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        showToast('Link copied!')
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        try {
          await navigator.clipboard?.writeText(shareUrl)
          showToast('Link copied!')
        } catch {
          showToast('Copy this link: ' + shareUrl)
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Card Container */}
      <div className="max-w-md mx-auto min-h-screen flex flex-col shadow-2xl">
        
        {/* ===== TOP SECTION - White Background ===== */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white px-8 pt-10 pb-8 flex flex-col items-center text-center relative"
        >
          {/* Logo */}
          <div className="w-24 h-24 mb-6">
            <img 
              src={CONTACT.logo} 
              alt="Bhumita Petrochem Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Company Name */}
          <h1 className="text-[#0B3D91] text-2xl font-bold tracking-wide mb-2">
            {CONTACT.company}
          </h1>

          {/* Tagline */}
          <p className="text-[#0B3D91] text-sm italic mb-6">
            {CONTACT.tagline}
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6 w-48">
            <div className="flex-1 h-0.5 bg-[#0B3D91]" />
            <div className="w-2 h-2 rotate-45 bg-[#0B3D91]" />
            <div className="flex-1 h-0.5 bg-[#0B3D91]" />
          </div>

          {/* Business Description */}
          <p className="text-[#0B3D91] text-sm font-medium">
            {CONTACT.businessDescription}
          </p>
        </motion.div>

        {/* ===== CURVED TRANSITION ===== */}
        <div className="relative h-16 bg-white">
          <svg 
            viewBox="0 0 400 60" 
            className="absolute bottom-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,60 L0,30 Q100,0 200,20 Q300,40 400,10 L400,60 Z" 
              fill="#0B3D91"
            />
            <path 
              d="M0,60 L0,45 Q100,20 200,35 Q300,50 400,25 L400,60 Z" 
              fill="#1565C0"
            />
          </svg>
        </div>

        {/* ===== BOTTOM SECTION - Blue Background ===== */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0B3D91] px-8 pt-6 pb-10 flex-1 relative"
        >
          {/* Decorative curved line */}
          <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden pointer-events-none opacity-20">
            <svg viewBox="0 0 200 400" className="h-full" preserveAspectRatio="none">
              <path d="M200,0 Q100,100 150,200 Q200,300 100,400 L200,400 L200,0 Z" fill="#1565C0"/>
            </svg>
          </div>

          {/* Contact Person */}
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-white text-2xl font-bold mb-1">{CONTACT.name}</h2>
            <p className="text-blue-200 text-sm font-medium">{CONTACT.title}</p>
          </div>

          {/* Contact Links */}
          <div className="space-y-4 mb-8 relative z-10">
            {/* Phone - Clickable */}
            <a 
              href={`tel:+${CONTACT.phoneClean}`}
              className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <FaPhone className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{CONTACT.phone}</span>
            </a>

            {/* WhatsApp - Clickable */}
            <a 
              href={`https://wa.me/${CONTACT.phoneClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <FaWhatsapp className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">WhatsApp</span>
            </a>

            {/* Email - Clickable */}
            <a 
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <FaEnvelope className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{CONTACT.email}</span>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 text-white">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{CONTACT.location}</span>
            </div>

            {/* Instagram - Clickable */}
            <a 
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <FaInstagram className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">@{CONTACT.instagram}</span>
            </a>

            {/* Website - Clickable */}
            <a 
              href={`https://${CONTACT.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{CONTACT.website}</span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 relative z-10">
            {/* Save Contact */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={downloadVCard}
              className="w-full py-3.5 rounded-xl bg-white text-[#0B3D91] font-semibold text-sm hover:bg-blue-50 transition-colors flex justify-center items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Save Contact
            </motion.button>

            {/* Share Card */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={shareCard}
              className="w-full py-3.5 rounded-xl bg-transparent border-2 border-white text-white font-semibold text-sm hover:bg-white/10 transition-colors flex justify-center items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Card
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
