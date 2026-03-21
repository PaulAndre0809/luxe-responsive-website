import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

type InfoContent = {
  title: string
  subtitle: string
  sections: Array<{ heading: string; body: string }>
}

const infoContent: Record<string, InfoContent> = {
  'contact-us': {
    title: 'Contact Us',
    subtitle: 'Our concierge team is available daily to assist with orders, styling, and product support.',
    sections: [
      { heading: 'Email', body: 'support@luxe.ae' },
      { heading: 'Phone', body: '+971 4 555 0199 (10:00 - 22:00 GST)' },
      { heading: 'Live Chat', body: 'Available from the help widget on every page.' },
    ],
  },
  'delivery-choices': {
    title: 'Delivery Choices',
    subtitle: 'Flexible options designed around your schedule.',
    sections: [
      { heading: 'Standard Delivery', body: '2-4 business days across the UAE.' },
      { heading: 'Express Delivery', body: 'Next business day for most metro locations.' },
      { heading: 'Same-Day Dubai', body: 'Order before 2pm for same-day delivery in Dubai.' },
    ],
  },
  'payment-options': {
    title: 'Payment Options',
    subtitle: 'Secure checkout with major global and regional payment methods.',
    sections: [
      { heading: 'Cards', body: 'Visa, Mastercard, American Express.' },
      { heading: 'Wallets', body: 'Apple Pay and PayPal.' },
      { heading: 'Security', body: 'All card payments are encrypted and PCI-compliant.' },
    ],
  },
  returns: {
    title: 'Returns',
    subtitle: 'Hassle-free returns on eligible items within 30 days.',
    sections: [
      { heading: 'Window', body: 'Return eligible items within 30 days of delivery.' },
      { heading: 'Condition', body: 'Items must be unused with original packaging and tags.' },
      { heading: 'Refunds', body: 'Refunds are processed to your original payment method.' },
    ],
  },
  'price-promise': {
    title: 'Price Promise',
    subtitle: 'We work to bring you competitive luxury pricing every season.',
    sections: [
      { heading: 'Matching', body: 'If a verified local retailer has a lower price, we may match it.' },
      { heading: 'Verification', body: 'Item must match brand, size, color, and stock availability.' },
      { heading: 'Exclusions', body: 'Flash sales, outlet-only, and member-only offers may be excluded.' },
    ],
  },
  faqs: {
    title: 'FAQs',
    subtitle: 'Answers to common questions about orders, sizing, and shipping.',
    sections: [
      { heading: 'Order Tracking', body: 'You can track your order from your confirmation email.' },
      { heading: 'Sizing', body: 'Use product-level size guides and fit notes before purchase.' },
      { heading: 'Support', body: 'If you still need help, contact our concierge team.' },
    ],
  },
  'our-story': {
    title: 'Our Story',
    subtitle: 'Luxe is a curated destination for luxury fashion, beauty, and lifestyle essentials.',
    sections: [
      { heading: 'Curation', body: 'We source iconic labels and emerging designers with lasting value.' },
      { heading: 'Experience', body: 'Editorial storytelling and seamless shopping in one destination.' },
      { heading: 'Promise', body: 'Authenticity, service, and speed at every step.' },
    ],
  },
  'store-locator': {
    title: 'Store Locator',
    subtitle: 'Visit our flagship experiences across the UAE.',
    sections: [
      { heading: 'Dubai Mall', body: 'Ground Floor, Fashion Avenue.' },
      { heading: 'Mall of the Emirates', body: 'Level 1, Luxury Wing.' },
      { heading: 'Abu Dhabi', body: 'Galleria Al Maryah Island, Level 2.' },
    ],
  },
  'our-app': {
    title: 'Our App',
    subtitle: 'Shop faster with personalized edits, wishlist sync, and order updates.',
    sections: [
      { heading: 'iOS and Android', body: 'Download on the App Store and Google Play.' },
      { heading: 'App-Only Drops', body: 'Early access to selected launches and restocks.' },
      { heading: 'Push Alerts', body: 'Get notified when saved items return in your size.' },
    ],
  },
  careers: {
    title: 'Careers',
    subtitle: 'Join teams building the future of luxury ecommerce.',
    sections: [
      { heading: 'Open Roles', body: 'Product, merchandising, operations, engineering, and retail.' },
      { heading: 'Culture', body: 'High ownership, thoughtful design, and customer obsession.' },
      { heading: 'Apply', body: 'Email careers@luxe.ae with your CV and portfolio.' },
    ],
  },
  'privacy-security': {
    title: 'Privacy and Security',
    subtitle: 'Your trust matters. We protect your data and payment details.',
    sections: [
      { heading: 'Data Use', body: 'We use your data to process orders and improve your experience.' },
      { heading: 'Security', body: 'Industry-standard encryption and secure payment gateways.' },
      { heading: 'Controls', body: 'You can request access, correction, or deletion of your data.' },
    ],
  },
  'terms-of-use': {
    title: 'Terms of Use',
    subtitle: 'By using Luxe, you agree to our commerce and platform terms.',
    sections: [
      { heading: 'Accounts', body: 'You are responsible for account confidentiality and activity.' },
      { heading: 'Orders', body: 'Orders are subject to stock verification and payment approval.' },
      { heading: 'Content', body: 'All trademarks and content belong to their respective owners.' },
    ],
  },
  'gift-registry': {
    title: 'Gift Registry',
    subtitle: 'Build your registry for weddings, celebrations, and milestone gifting.',
    sections: [
      { heading: 'Create', body: 'Curate your wishlist and share a registry link with guests.' },
      { heading: 'Manage', body: 'Track purchases and thank-you notes from your dashboard.' },
      { heading: 'Support', body: 'Dedicated concierge available for setup and curation.' },
    ],
  },
  'in-store-services': {
    title: 'In-Store Services',
    subtitle: 'Private appointments and elevated services at selected locations.',
    sections: [
      { heading: 'Personal Shopping', body: 'Book a 1:1 styling session with our advisors.' },
      { heading: 'Alterations', body: 'Tailoring support for eligible apparel purchases.' },
      { heading: 'Gift Wrapping', body: 'Premium packaging for all gifting occasions.' },
    ],
  },
  'fragrance-finder': {
    title: 'Fragrance Finder',
    subtitle: 'Discover your signature scent in minutes.',
    sections: [
      { heading: 'Profiles', body: 'Filter by woody, floral, citrus, and gourmand families.' },
      { heading: 'Occasion', body: 'Find scents for daywear, evenings, and special events.' },
      { heading: 'Recommendations', body: 'Get curated picks from our beauty specialists.' },
    ],
  },
  'beauty-rewards': {
    title: 'Beauty Rewards',
    subtitle: 'Earn points on every beauty purchase and unlock exclusive perks.',
    sections: [
      { heading: 'Earn', body: 'Collect points on eligible products and services.' },
      { heading: 'Redeem', body: 'Use points for discounts, samples, and gifts.' },
      { heading: 'Tiers', body: 'Higher tiers unlock private events and early launches.' },
    ],
  },
  'amber-rewards': {
    title: 'Amber Rewards',
    subtitle: 'Our premium loyalty tier for frequent shoppers.',
    sections: [
      { heading: 'Benefits', body: 'Priority delivery, concierge access, and private previews.' },
      { heading: 'Eligibility', body: 'Tier access based on annual qualifying spend.' },
      { heading: 'Support', body: 'Dedicated account managers for Amber members.' },
    ],
  },
}

export default function InfoPage() {
  const { slug = '' } = useParams()
  const page = infoContent[slug]
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!page) {
    return (
      <main style={{ minHeight: '70vh', background: '#fafaf8', padding: isMobile ? '40px 16px' : '56px 60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '620px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '10px' }}>Page Not Found</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? '36px' : '46px', fontWeight: 300, marginBottom: '16px', fontStyle: 'italic' }}>We could not find that page</h1>
          <Link to="/" style={{ display: 'inline-block', textDecoration: 'none', padding: '12px 30px', background: '#0a0a0a', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background: '#fafaf8', minHeight: '100vh', padding: isMobile ? '32px 16px 60px' : '48px 60px 80px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '10px' }}>Luxe Information</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? '38px' : '56px', lineHeight: 1.05, fontWeight: 300, fontStyle: 'italic', marginBottom: '18px' }}>{page.title}</h1>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: isMobile ? '13px' : '14px', lineHeight: 1.8, color: '#4a4744', marginBottom: '34px', maxWidth: '760px' }}>{page.subtitle}</p>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {page.sections.map(section => (
            <article key={section.heading} style={{ background: '#fff', border: '1px solid #e8e4de', padding: '20px' }}>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '10px' }}>{section.heading}</h2>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', lineHeight: 1.7, color: '#4a4744' }}>{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
