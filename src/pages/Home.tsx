import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

const heroSlides = [
  { bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80', tag: 'Eid Sale — Up to 50% Off', title: 'The Eid\nEdit', sub: "Curated luxury for every celebration", cta: 'Shop the Sale', href: '/products?cat=sale' },
  { bg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80', tag: 'New Season', title: 'Fresh\nArrivals', sub: "The latest from the world's top designers", cta: 'Discover New In', href: '/products?cat=new' },
  { bg: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80', tag: 'Best of Bags', title: 'Carry\nWith Style', sub: 'From Gucci to Saint Laurent — iconic bags await', cta: 'Shop Bags', href: '/products?cat=bags' },
]

const categories = [
  { name: "Women's Dresses", image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80', href: '/products?cat=women' },
  { name: "Women's Bags", image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80', href: '/products?cat=bags' },
  { name: "Men's Sneakers", image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', href: '/products?cat=men' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', href: '/products?cat=beauty' },
  { name: 'Baby', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80', href: '/products?cat=baby' },
  { name: 'Home', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', href: '/products?cat=home' },
]

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(36px)', transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms` }}>
      {children}
    </div>
  )
}

export default function Home() {
  const [slide, setSlide] = useState(0)
  const featured = products.slice(0, 6)

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const s = heroSlides[slide]

  return (
    <main style={{ background: '#fafaf8' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '90vh', overflow: 'hidden' }}>
        {heroSlides.map((hs, i) => (
          <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === slide ? 1 : 0, transition: 'opacity 1.2s ease' }}>
            <img src={hs.bg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />
          </div>
        ))}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 80px' }}>
          <div key={slide} style={{ color: '#fff', maxWidth: '560px' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '18px', animation: 'fadeUp 0.6s ease forwards' }}>{s.tag}</p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(56px,8vw,108px)', fontWeight: 300, lineHeight: 0.95, marginBottom: '22px', whiteSpace: 'pre-line', animation: 'fadeUp 0.7s ease 0.1s both' }}>{s.title}</h1>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 300, marginBottom: '34px', color: 'rgba(255,255,255,0.85)', animation: 'fadeUp 0.7s ease 0.2s both' }}>{s.sub}</p>
            <Link to={s.href} style={{ display: 'inline-block', padding: '13px 38px', background: 'transparent', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.65)', transition: 'all 0.3s ease', animation: 'fadeUp 0.7s ease 0.3s both' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0a0a0a' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
            >{s.cta}</Link>
          </div>
        </div>
        {/* Dots */}
        <div style={{ position: 'absolute', bottom: '30px', left: '80px', display: 'flex', gap: '10px' }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? '30px' : '8px', height: '2px', background: i === slide ? '#b8975a' : 'rgba(255,255,255,0.35)', border: 'none', cursor: 'pointer', transition: 'all 0.4s ease' }} />
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: '#0a0a0a', padding: '13px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', animation: 'marquee 22s linear infinite', whiteSpace: 'nowrap' }}>
          {[0, 1].map(i => (
            <span key={i} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#b8975a', letterSpacing: '3px', paddingRight: '60px', fontStyle: 'italic' }}>
              Free Shipping Over AED 500 &nbsp;·&nbsp; New Season Arrivals &nbsp;·&nbsp; Up to 50% Off in the Eid Sale &nbsp;·&nbsp; Exclusive Designer Edits &nbsp;·&nbsp; Same Day Delivery in Dubai &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* EDITORIAL SPLIT */}
      <AnimatedSection>
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', margin: '2px 0' }}>
          {[
            { image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&q=80', tag: 'The Edit', title: 'Matching Shoes & Bags', desc: "Elegant women's shoes and bags from Malone Souliers and TOTEME", cta: 'Shop The Edit', href: '/products?cat=bags' },
            { image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=700&q=80', tag: 'New Designer', title: 'Meet Eredi Zucca', desc: 'Italian craftsmanship in every bottle — bold, modern scents', cta: 'Discover Now', href: '/products?cat=beauty' },
          ].map((ed, i) => (
            <div key={i} className="img-zoom" style={{ position: 'relative', overflow: 'hidden', height: '520px' }}>
              <img src={ed.image} alt={ed.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: '36px', left: '36px', color: '#fff' }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '8px' }}>{ed.tag}</p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '34px', fontWeight: 400, marginBottom: '8px' }}>{ed.title}</h3>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 300, marginBottom: '18px', opacity: 0.88, maxWidth: '280px' }}>{ed.desc}</p>
                <Link to={ed.href} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#fff', textDecoration: 'none', borderBottom: '1px solid #b8975a', paddingBottom: '2px' }}>{ed.cta}</Link>
              </div>
            </div>
          ))}
        </section>
      </AnimatedSection>

      {/* CATEGORIES */}
      <AnimatedSection delay={100}>
        <section style={{ padding: '80px 60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '12px' }}>Explore</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '44px', fontWeight: 300, fontStyle: 'italic' }}>Shop by Category</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '16px' }}>
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.name} delay={i * 70}>
                <Link to={cat.href} style={{ textDecoration: 'none', color: '#0a0a0a', display: 'block' }}>
                  <div className="img-zoom" style={{ marginBottom: '12px', overflow: 'hidden', aspectRatio: '3/4' }}>
                    <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} />
                  </div>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '1px', textAlign: 'center', textTransform: 'uppercase' }}>{cat.name}</p>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '1px', textAlign: 'center', color: '#b8975a', marginTop: '3px' }}>Shop Now</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* FEATURE BANNER */}
      <AnimatedSection>
        <section style={{ position: 'relative', height: '460px', overflow: 'hidden', margin: '0 60px', borderRadius: '2px' }}>
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80" alt="Feature" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.1) 65%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '64px', transform: 'translateY(-50%)', color: '#fff', maxWidth: '400px' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '12px' }}>Featured Designer</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '52px', fontWeight: 300, lineHeight: 1.1, marginBottom: '14px' }}>The Balenciaga<br /><em>Rodeo Edit</em></h2>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 300, marginBottom: '26px', opacity: 0.88 }}>Standout designs by the iconic luxury fashion house</p>
            <Link to="/products" style={{ display: 'inline-block', padding: '12px 34px', background: 'transparent', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.55)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#b8975a'; e.currentTarget.style.borderColor = '#b8975a' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)' }}
            >Shop Now</Link>
          </div>
        </section>
      </AnimatedSection>

      {/* NEW IN PRODUCTS */}
      <AnimatedSection delay={100}>
        <section style={{ padding: '80px 60px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px' }}>
            <div>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '10px' }}>Just Arrived</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '44px', fontWeight: 300, fontStyle: 'italic' }}>Shop New In</h2>
            </div>
            <Link to="/products" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#0a0a0a', textDecoration: 'none', borderBottom: '1px solid #0a0a0a', paddingBottom: '2px' }}>View All</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '20px' }}>
            {featured.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 60}>
                <ProductCard product={p} />
              </AnimatedSection>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '52px' }}>
            <Link to="/products" style={{ display: 'inline-block', padding: '14px 52px', background: '#0a0a0a', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid #0a0a0a', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a0a0a' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#fff' }}
            >Shop All</Link>
          </div>
        </section>
      </AnimatedSection>

      {/* GIFT CARD BANNER */}
      <AnimatedSection>
        <section style={{ margin: '0 60px 80px', background: '#0a0a0a', padding: '56px 72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '12px' }}>The Perfect Gift</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', fontWeight: 300, color: '#fafaf8', fontStyle: 'italic', marginBottom: '10px' }}>E-Gift Cards</h2>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.65)', maxWidth: '360px' }}>Give the gift of choice — let them discover their perfect style.</p>
          </div>
          <Link to="/products" style={{ display: 'inline-block', padding: '13px 38px', background: '#b8975a', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid #b8975a', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#b8975a' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#b8975a'; e.currentTarget.style.color = '#fff' }}
          >Shop Now</Link>
        </section>
      </AnimatedSection>

    </main>
  )
}