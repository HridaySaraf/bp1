import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa6'
import { MapPin, Globe, Download, Share2, Check, X } from 'lucide-react'

// Contact Information
const CONTACT = {
  name: 'Pranay Shah',
  title: 'Director',
  company: 'BHUMITA PETROCHEM',
  tagline: 'Where purity meets performance',
  businessDescription: 'Suppliers of all brands of D.E.F.',
  phone: '+91 887-9787-900',
  phoneClean: '918879787900',
  email: 'info@bhumitapetrochem.com',
  website: 'bhumitapetrochem.com',
  instagram: 'bhumitapetrochem',
  instagramUrl: 'https://www.instagram.com/bhumitapetrochem',
  location: 'Mumbai, India',
  logo: 'https://customer-assets.emergentagent.com/job_visitcard-hub/artifacts/zqt8r0fa_image.png',
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

// Generate vCard string - Works on Android, iPhone, Desktop
const generateVCard = () => {
  // Using vCard 3.0 for maximum compatibility
  const vCard = [
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
  
  return vCard
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
      {type === 'success' ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <X className="w-4 h-4 text-red-600" />
      )}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-900">{message}</p>
    </div>
    <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600">
      <X className="w-4 h-4" />
    </button>
  </motion.div>
)

// Quick Action Button Component
const ActionButton = ({ icon: Icon, label, href, onClick, testId }) => {
  const content = (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center justify-center p-5 rounded-xl bg-[#f0f7ff] border border-[#0066CC]/20 hover:bg-[#e0f0ff] hover:border-[#0066CC]/40 transition-all duration-300 group cursor-pointer h-full"
      data-testid={testId}
    >
      <Icon className="w-6 h-6 text-[#0066CC] group-hover:text-[#004499] transition-colors duration-300 mb-2" />
      <span className="text-sm font-medium text-[#0066CC] group-hover:text-[#004499] transition-colors duration-300">
        {label}
      </span>
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }

  return <button onClick={onClick} className="w-full">{content}</button>
}

export default function DigitalCard() {
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Download vCard - Cross-platform compatible (Android/iPhone/Desktop)
  const downloadVCard = () => {
    try {
      const vCardContent = generateVCard()
      const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' })
      const filename = `${CONTACT.name.replace(/\s+/g, '_')}_Bhumita_Petrochem.vcf`
      
      // Check if on iOS Safari
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
      
      if (isIOS && isSafari) {
        // iOS Safari: Use data URL approach
        const reader = new FileReader()
        reader.onload = () => {
          const dataUrl = reader.result
          const link = document.createElement('a')
          link.href = dataUrl
          link.download = filename
          link.click()
          showToast('Contact ready to save!')
        }
        reader.readAsDataURL(blob)
      } else if (navigator.userAgent.match(/Android/i)) {
        // Android: Try multiple methods
        const url = URL.createObjectURL(blob)
        
        // Method 1: Try direct download
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
        
        showToast('Contact saved! Check downloads.')
      } else {
        // Desktop browsers
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        showToast('Contact saved!')
      }
    } catch (error) {
      console.error('vCard download error:', error)
      showToast('Could not save contact', 'error')
    }
  }

  // Share card functionality - Cross-platform
  const shareCard = async () => {
    const shareUrl = window.location.href
    const shareData = {
      title: `${CONTACT.name} - ${CONTACT.company}`,
      text: `Digital Business Card for ${CONTACT.name}, ${CONTACT.title} at ${CONTACT.company}`,
      url: shareUrl,
    }

    try {
      // Check if Web Share API is available (mobile browsers)
      if (navigator.share) {
        await navigator.share(shareData)
        showToast('Shared successfully!')
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareUrl)
        showToast('Link copied to clipboard!')
      } else {
        // Final fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = shareUrl
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        showToast('Link copied to clipboard!')
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        // User cancelled share - do nothing
        return
      }
      // Try clipboard as fallback
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareUrl)
          showToast('Link copied to clipboard!')
        } else {
          showToast('Share: ' + shareUrl, 'success')
        }
      } catch {
        showToast('Share: ' + shareUrl, 'success')
      }
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center py-8 px-4">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Decorative blue wave */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden pointer-events-none">
        <svg viewBox="0 0 200 800" className="absolute right-0 h-full" preserveAspectRatio="none">
          <path d="M100,0 Q200,200 150,400 Q100,600 200,800 L200,800 L200,0 Z" fill="#0066CC" opacity="0.15"/>
          <path d="M150,0 Q250,200 180,400 Q120,600 200,800 L200,800 L200,0 Z" fill="#004499" opacity="0.1"/>
        </svg>
      </div>

      {/* Main Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl shadow-blue-100/50 overflow-hidden relative z-10"
        data-testid="digital-card"
      >
        {/* Blue accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#0066CC] via-[#0088EE] to-[#0066CC]" />
        
        <div className="p-6 sm:p-8">
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-8">
            {/* Logo */}
            <div className="w-20 h-20 rounded-xl bg-white p-2 mb-5 shadow-lg ring-1 ring-gray-100">
              <img 
                src={CONTACT.logo} 
                alt={`${CONTACT.company} Logo`}
                className="w-full h-full object-contain"
                data-testid="company-logo"
                loading="eager"
              />
            </div>
            
            {/* Company Name */}
            <h1 className="font-bold text-2xl tracking-wide text-[#0066CC] mb-1" data-testid="company-name">
              {CONTACT.company}
            </h1>
            
            {/* Tagline */}
            <p className="text-sm font-medium italic text-[#0066CC]/80 mb-6" data-testid="tagline">
              {CONTACT.tagline}
            </p>
            
            {/* Diamond Divider */}
            <div className="flex items-center gap-3 mb-6 w-full max-w-[200px]">
              <div className="flex-1 h-0.5 bg-[#0066CC]" />
              <div className="w-2 h-2 rotate-45 bg-[#0066CC]" />
              <div className="flex-1 h-0.5 bg-[#0066CC]" />
            </div>
            
            {/* Contact Person */}
            <h2 className="text-xl font-semibold text-[#004499]" data-testid="contact-name">
              {CONTACT.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1 font-medium" data-testid="contact-title">
              {CONTACT.title}
            </p>
          </motion.div>

          {/* Quick Actions Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-6">
            <ActionButton
              icon={FaPhone}
              label="Call"
              href={`tel:+${CONTACT.phoneClean}`}
              testId="call-button"
            />
            <ActionButton
              icon={FaWhatsapp}
              label="WhatsApp"
              href={`https://wa.me/${CONTACT.phoneClean}`}
              testId="whatsapp-button"
            />
            <ActionButton
              icon={FaEnvelope}
              label="Email"
              href={`mailto:${CONTACT.email}`}
              testId="email-button"
            />
            <ActionButton
              icon={FaInstagram}
              label="Instagram"
              href={CONTACT.instagramUrl}
              testId="instagram-button"
            />
          </motion.div>

          {/* Primary Actions */}
          <motion.div variants={itemVariants} className="space-y-3 mb-8">
            {/* Save Contact Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={downloadVCard}
              className="w-full py-3.5 rounded-xl bg-[#0066CC] text-white font-semibold text-base hover:bg-[#0055AA] shadow-lg shadow-blue-500/25 transition-all duration-300 flex justify-center items-center gap-2"
              data-testid="save-contact-button"
            >
              <Download className="w-4 h-4" />
              Save Contact
            </motion.button>

            {/* Share Card Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={shareCard}
              className="w-full py-3.5 rounded-xl bg-white border-2 border-[#0066CC] text-[#0066CC] font-semibold text-base hover:bg-[#f0f7ff] transition-all duration-300 flex justify-center items-center gap-2"
              data-testid="share-card-button"
            >
              <Share2 className="w-4 h-4" />
              Share Card
            </motion.button>
          </motion.div>

          {/* Footer Info */}
          <motion.div variants={itemVariants} className="pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600" data-testid="location">
                <MapPin className="w-4 h-4 text-[#0066CC]" />
                <span>{CONTACT.location}</span>
              </div>
              
              {/* Website */}
              <a 
                href={`https://${CONTACT.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-[#0066CC] transition-colors duration-300"
                data-testid="website-link"
              >
                <Globe className="w-4 h-4 text-[#0066CC]" />
                <span>{CONTACT.website}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
