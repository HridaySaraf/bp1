import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa6';
import { MapPin, Globe, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

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
  instagramUrl: 'https://www.instagram.com/bhumitapetrochem?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  location: 'Mumbai, India',
  logo: 'https://customer-assets.emergentagent.com/job_visitcard-hub/artifacts/zqt8r0fa_image.png',
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// Generate vCard string
const generateVCard = () => {
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${CONTACT.name}
ORG:${CONTACT.company}
TITLE:${CONTACT.title}
TEL;TYPE=WORK,VOICE:${CONTACT.phoneClean}
EMAIL;TYPE=WORK:${CONTACT.email}
URL:https://${CONTACT.website}
ADR;TYPE=WORK:;;;;;;${CONTACT.location}
NOTE:${CONTACT.tagline} - ${CONTACT.businessDescription}
END:VCARD`;
  return vCard;
};

// Download vCard
const downloadVCard = () => {
  const vCardContent = generateVCard();
  const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${CONTACT.name.replace(' ', '_')}_Bhumita_Petrochem.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
  toast.success('Contact saved!', {
    description: 'Check your downloads folder',
  });
};

// Share card functionality
const shareCard = async () => {
  const shareUrl = window.location.href;
  const shareData = {
    title: `${CONTACT.name} - ${CONTACT.company}`,
    text: `Digital Business Card for ${CONTACT.name}, ${CONTACT.title} at ${CONTACT.company}`,
    url: shareUrl,
  };

  try {
    if (navigator.share && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied!', {
        description: 'Share this link with your contacts',
      });
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied!', {
        description: 'Share this link with your contacts',
      });
    }
  }
};

// Quick Action Button Component
const ActionButton = ({ icon: Icon, label, href, onClick, testId }) => {
  const content = (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center justify-center p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 group cursor-pointer h-full"
      data-testid={testId}
    >
      <Icon className="w-6 h-6 text-slate-400 group-hover:text-amber-500 transition-colors duration-300 mb-2" />
      <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors duration-300">
        {label}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return <button onClick={onClick} className="w-full">{content}</button>;
};

export default function DigitalCard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden flex items-center justify-center py-8 px-4">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Gradient orbs for subtle depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />

      {/* Main Card Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative z-10"
        data-testid="digital-card"
      >
        {/* Header with gradient accent */}
        <div className="h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />
        
        <div className="p-8">
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-8">
            {/* Logo */}
            <div className="w-20 h-20 rounded-xl bg-white p-2.5 mb-5 shadow-lg ring-1 ring-black/5">
              <img 
                src={CONTACT.logo} 
                alt={`${CONTACT.company} Logo`}
                className="w-full h-full object-contain"
                data-testid="company-logo"
              />
            </div>
            
            {/* Company Name */}
            <h1 
              className="font-semibold text-2xl tracking-wide text-white mb-1"
              data-testid="company-name"
            >
              {CONTACT.company}
            </h1>
            
            {/* Tagline */}
            <p 
              className="text-xs font-medium uppercase tracking-[0.15em] text-amber-500/90 mb-6"
              data-testid="tagline"
            >
              {CONTACT.tagline}
            </p>
            
            {/* Elegant Divider */}
            <div className="flex items-center gap-3 mb-6 w-full max-w-[200px]">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/20" />
            </div>
            
            {/* Contact Person */}
            <h2 
              className="text-xl font-medium text-white"
              data-testid="contact-name"
            >
              {CONTACT.name}
            </h2>
            <p 
              className="text-sm text-slate-400 mt-1 font-medium"
              data-testid="contact-title"
            >
              {CONTACT.title}
            </p>
          </motion.div>

          {/* Quick Actions Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-6">
            <ActionButton
              icon={FaPhone}
              label="Call"
              href={`tel:${CONTACT.phoneClean}`}
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
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-semibold text-base hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/20 transition-all duration-300 flex justify-center items-center gap-2"
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
              className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-base hover:bg-white/10 transition-all duration-300 flex justify-center items-center gap-2"
              data-testid="share-card-button"
            >
              <Share2 className="w-4 h-4" />
              Share Card
            </motion.button>
          </motion.div>

          {/* Footer Info */}
          <motion.div variants={itemVariants} className="pt-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
              {/* Location */}
              <div className="flex items-center gap-2 text-slate-400" data-testid="location">
                <MapPin className="w-4 h-4 text-amber-500/70" />
                <span>{CONTACT.location}</span>
              </div>
              
              {/* Website */}
              <a 
                href={`https://${CONTACT.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors duration-300"
                data-testid="website-link"
              >
                <Globe className="w-4 h-4 text-amber-500/70" />
                <span>{CONTACT.website}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
