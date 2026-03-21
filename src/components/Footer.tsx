import { useState } from 'react'
import { Link } from 'react-router-dom'

const trendingColumns = [
  {
    title: 'Top Searches',
    items: [
      { label: 'CHANEL Beauty', href: '/products?search=chanel&cat=beauty' },
      { label: 'Dior Beauty', href: '/products?search=dior&cat=beauty' },
      { label: 'Dior Fragrance', href: '/products?search=fragrance&cat=beauty' },
      { label: 'CHANEL Fragrance', href: '/products?search=chanel+fragrance&cat=beauty' },
      { label: 'Diptyque', href: '/products?search=diptyque&cat=beauty' },
    ],
  },
  {
    title: 'Most Favourited',
    items: [
      { label: 'Diptyque Fragrance', href: '/products?search=fragrance&cat=beauty' },
      { label: 'Armani Beauty', href: '/products?search=armani&cat=beauty' },
      { label: 'CHANEL Makeup', href: '/products?search=chanel&cat=beauty' },
      { label: 'CHANEL Women', href: '/products?search=chanel&cat=women' },
      { label: 'Hermes Beauty', href: '/products?search=hermes&cat=beauty' },
    ],
  },
  {
    title: 'Trending',
    items: [
      { label: 'Suits and Tailoring', href: '/products?cat=men&search=tailored' },
      { label: 'Hats', href: '/products?search=hat' },
      { label: 'Loungewear', href: '/products?search=lounge' },
      { label: 'Fine Jewelry', href: '/products?search=jewelry' },
      { label: 'Swimwear', href: '/products?search=swim' },
    ],
  },
]

const footerSections = [
  {
    title: 'Customer Service',
    links: [
      { label: 'Contact Us', href: '/info/contact-us' },
      { label: 'Delivery Choices', href: '/info/delivery-choices' },
      { label: 'Payment Options', href: '/info/payment-options' },
      { label: 'Returns', href: '/info/returns' },
      { label: 'Price Promise', href: '/info/price-promise' },
      { label: 'FAQs', href: '/info/faqs' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'Our Story', href: '/info/our-story' },
      { label: 'Store Locator', href: '/info/store-locator' },
      { label: 'Our App', href: '/info/our-app' },
      { label: 'Careers', href: '/info/careers' },
      { label: 'Privacy and Security', href: '/info/privacy-security' },
      { label: 'Terms of Use', href: '/info/terms-of-use' },
    ],
  },
  {
    title: 'Services and Events',
    links: [
      { label: 'Gift Registry', href: '/info/gift-registry' },
      { label: 'In-Store Services', href: '/info/in-store-services' },
      { label: 'Fragrance Finder', href: '/info/fragrance-finder' },
      { label: 'Beauty Rewards', href: '/info/beauty-rewards' },
      { label: 'Amber Rewards', href: '/info/amber-rewards' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const normalized = email.trim().toLowerCase()
    if (!normalized || !normalized.includes('@')) {
      setStatus('Please enter a valid email address.')
      return
    }

    setStatus('Thanks for subscribing. New drops and offers are on the way.')
    setEmail('')
  }

  return (
    <footer style={{ color: '#fafaf8' }}>

      {/* Top trending — distinct warm charcoal section */}
      <div style={{ background: '#1c1915', borderTop: '3px solid #b8975a', paddingTop: '40px' }}>
        <div style={{ padding: '0 60px 12px' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '8px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '28px' }}>What's Trending</p>
        </div>
        <div style={{ padding: '0 60px 48px', borderBottom: '1px solid #2e2a25', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '40px' }}>
        {trendingColumns.map(col => (
          <div key={col.title}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '16px' }}>{col.title}</p>
            {col.items.map(item => (
              <Link key={item.label} to={item.href} style={{ display: 'block', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#5a5754', textDecoration: 'none', marginBottom: '9px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fafaf8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#5a5754')}
              >{item.label}</Link>
            ))}
          </div>
        ))}
        </div>
      </div>

      {/* Main footer — pure black */}
      <div style={{ background: '#0a0a0a', paddingTop: '48px' }}>

      {/* Newsletter */}
      <div style={{ borderBottom: '1px solid #1a1a1a', padding: '30px 60px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '2px', color: '#b8975a', textTransform: 'uppercase', marginBottom: '8px' }}>Newsletter</p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#7a7571' }}>Get private sale alerts and weekly product edits.</p>
        </div>
        <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address"
            style={{ width: '250px', maxWidth: '100%', background: 'transparent', border: '1px solid #2c2a28', color: '#fafaf8', padding: '10px 12px', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', outline: 'none' }}
          />
          <button type="submit" style={{ border: '1px solid #b8975a', background: '#b8975a', color: '#fff', padding: '10px 18px', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Subscribe
          </button>
        </form>
        {status && <p style={{ width: '100%', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#b8975a', marginTop: '-4px' }}>{status}</p>}
      </div>

      {/* Logo */}
      <div style={{ textAlign: 'center', padding: '48px 0 40px' }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '38px', fontWeight: 300, fontStyle: 'italic', color: '#fafaf8', letterSpacing: '3px' }}>luxe</div>
      </div>

      {/* Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '40px', padding: '0 60px 48px' }}>
        {footerSections.map(sec => (
          <div key={sec.title}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '16px' }}>{sec.title}</p>
            {sec.links.map(link => (
              <Link key={link.label} to={link.href} style={{ display: 'block', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#5a5754', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fafaf8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#5a5754')}
              >{link.label}</Link>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid #1a1a1a', padding: '20px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: '#3a3734' }}>© 2026 Luxe. All Rights Reserved.</p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: '1px solid #2b2825', color: '#7a7571', padding: '5px 8px', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Back to top
          </button>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {['Instagram', 'TikTok', 'YouTube'].map(platform => (
            <button
              key={platform}
              onClick={() => window.open(`https://${platform.toLowerCase()}.com`, '_blank', 'noopener,noreferrer')}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '8px', fontWeight: 600, letterSpacing: '0.5px', color: '#3a3734', border: '1px solid #222', padding: '4px 7px', borderRadius: '2px', background: 'transparent', cursor: 'pointer' }}
            >
              {platform}
            </button>
          ))}
          {['VISA', 'MASTERCARD', 'AMEX', 'APPLE PAY', 'PAYPAL'].map(p => (
            <span key={p} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '8px', fontWeight: 600, letterSpacing: '0.5px', color: '#3a3734', border: '1px solid #222', padding: '4px 7px', borderRadius: '2px' }}>{p}</span>
          ))}
        </div>
      </div>

      </div>
    </footer>
  )
}