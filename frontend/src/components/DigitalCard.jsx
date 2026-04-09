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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center justify-center p-5 rounded-2xl bg-industrial-surface border border-industrial-border hover:bg-industrial-surface-hover hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer h-full"
      data-testid={testId}
    >
      <Icon className="w-7 h-7 text-industrial-text-muted group-hover:text-cyan-400 transition-colors duration-300 mb-2" />
      <span className="text-sm font-ibm text-industrial-text-muted group-hover:text-white transition-colors duration-300">
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
    <div className="min-h-screen bg-industrial-bg relative overflow-hidden flex items-center justify-center py-8 px-4">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(https://static.prod-images.emergentagent.com/jobs/52664dc2-5e25-44bb-8185-a22124802875/images/030cef0149f4d1ac30b89264efad0023677ce156b3c350cfbe5f70e27a1982e1.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Liquid accent overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(https://static.prod-images.emergentagent.com/jobs/52664dc2-5e25-44bb-8185-a22124802875/images/32ed86799dcfdf672a14c3b9faef0d4053745353dab340b55aafadec01c15a11.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Main Card Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden p-6 sm:p-8 relative z-10"
        data-testid="digital-card"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-8">
          {/* Logo */}
          <div className="w-24 h-24 rounded-2xl bg-white p-2 mb-5 shadow-lg">
            <img 
              src={CONTACT.logo} 
              alt={`${CONTACT.company} Logo`}
              className="w-full h-full object-contain"
              data-testid="company-logo"
            />
          </div>
          
          {/* Company Name */}
          <h1 
            className="font-cabinet text-2xl sm:text-3xl font-black tracking-tighter text-white uppercase mb-1"
            data-testid="company-name"
          >
            {CONTACT.company}
          </h1>
          
          {/* Tagline */}
          <p 
            className="font-ibm text-xs font-bold uppercase tracking-[0.2em] text-cyan-400 mb-6"
            data-testid="tagline"
          >
            {CONTACT.tagline}
          </p>
          
          {/* Divider */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6" />
          
          {/* Contact Person */}
          <h2 
            className="font-cabinet text-xl sm:text-2xl font-bold tracking-tight text-white"
            data-testid="contact-name"
          >
            {CONTACT.name}
          </h2>
          <p 
            className="font-ibm text-sm text-industrial-text-muted mt-1"
            data-testid="contact-title"
          >
            {CONTACT.title}
          </p>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mb-6">
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadVCard}
            className="w-full py-4 rounded-xl bg-cyan-400 text-black font-cabinet font-bold text-lg hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all duration-300 flex justify-center items-center gap-2"
            data-testid="save-contact-button"
          >
            <Download className="w-5 h-5" />
            Save Contact
          </motion.button>

          {/* Share Card Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={shareCard}
            className="w-full py-4 rounded-xl bg-transparent border border-zinc-700 text-white font-cabinet font-bold text-lg hover:bg-white/5 transition-all duration-300 flex justify-center items-center gap-2"
            data-testid="share-card-button"
          >
            <Share2 className="w-5 h-5" />
            Share Card
          </motion.button>
        </motion.div>

        {/* Footer Info */}
        <motion.div variants={itemVariants} className="pt-6 border-t border-industrial-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            {/* Location */}
            <div className="flex items-center gap-2 text-industrial-text-muted" data-testid="location">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="font-ibm">{CONTACT.location}</span>
            </div>
            
            {/* Website */}
            <a 
              href={`https://${CONTACT.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-industrial-text-muted hover:text-cyan-400 transition-colors duration-300"
              data-testid="website-link"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="font-ibm">{CONTACT.website}</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
