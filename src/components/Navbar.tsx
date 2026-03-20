import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, Heart, ShoppingBag, X, Menu } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

const navLinks = [
  { label: 'Sale', href: '/products?cat=sale', accent: true },
  { label: 'New In', href: '/products?cat=new' },
  { label: 'Women', href: '/products?cat=women' },
  { label: 'Bags', href: '/products?cat=bags' },
  { label: 'Shoes', href: '/products?cat=shoes' },
  { label: 'Beauty', href: '/products?cat=beauty' },
  { label: 'Men', href: '/products?cat=men' },
  { label: 'Designers', href: '/products?cat=designers' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 960)
  const count = useCartStore(s => s.count())
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setMobileOpen(false)
      setSearchOpen(false)
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [location.pathname, location.search])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 960)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchVal.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchVal.trim())}`)
      setSearchOpen(false)
      setSearchVal('')
    }
  }

  return (
    <>
      {/* Announcement bar */}
      <div style={{ background: '#0a0a0a', color: '#b8975a', textAlign: 'center', padding: '9px', fontSize: '10px', letterSpacing: '2px', fontFamily: 'Montserrat, sans-serif' }}>
        FREE SHIPPING ON ORDERS OVER AED 500 &nbsp;·&nbsp; UP TO 50% OFF IN THE EID SALE &nbsp;·&nbsp; SAME DAY DELIVERY IN DUBAI
      </div>

      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(250,250,248,0.96)' : '#fafaf8',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid #e8e4de',
        transition: 'all 0.3s ease',
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', height: '64px' }}>

          {/* Search */}
          <div style={{ flex: 1 }}>
            {searchOpen ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '280px', animation: 'fadeIn 0.25s ease' }}>
                <input
                  autoFocus
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search products, brands..."
                  style={{ border: 'none', borderBottom: '1px solid #0a0a0a', background: 'transparent', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', padding: '4px 0', width: '100%', outline: 'none', letterSpacing: '0.5px' }}
                />
                <X size={15} style={{ cursor: 'pointer', color: '#8a8680', flexShrink: 0 }} onClick={() => { setSearchOpen(false); setSearchVal('') }} />
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={17} color="#0a0a0a" />
                <span style={{ fontSize: '11px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.5px', color: '#8a8680' }}>Search</span>
              </button>
            )}
          </div>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flex: 1, textAlign: 'center' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 400, letterSpacing: '4px', color: '#0a0a0a', fontStyle: 'italic' }}>luxe</span>
          </Link>

          {/* Icons */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '22px' }}>
            <Link to="/products?cat=new" style={{ color: '#0a0a0a', display: 'flex' }}>
              <Heart size={18} style={{ cursor: 'pointer', color: '#0a0a0a' }} />
            </Link>
            <Link to="/cart" style={{ color: '#0a0a0a', position: 'relative', display: 'flex' }}>
              <ShoppingBag size={18} />
              {count > 0 && (
                <span style={{ position: 'absolute', top: '-7px', right: '-7px', background: '#b8975a', color: '#fff', borderRadius: '50%', width: '17px', height: '17px', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                  {count}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: isMobile ? 'flex' : 'none' }}>
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Category links */}
        <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', gap: '36px', padding: '0 48px', height: '40px', borderTop: '1px solid #f0ede8' }}>
          {navLinks.map(link => (
            <Link key={link.label} to={link.href}
              style={{ textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: link.accent ? '#b8975a' : '#0a0a0a', padding: '4px 0', borderBottom: '1px solid transparent', transition: 'border-color 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget.style.borderBottomColor = link.accent ? '#b8975a' : '#0a0a0a')}
              onMouseLeave={e => (e.currentTarget.style.borderBottomColor = 'transparent')}
            >{link.label}</Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, background: '#fafaf8', zIndex: 200, padding: '40px', animation: 'fadeIn 0.2s ease' }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {navLinks.map(link => (
              <Link key={link.label} to={link.href} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 300, color: link.accent ? '#b8975a' : '#0a0a0a', textDecoration: 'none' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}