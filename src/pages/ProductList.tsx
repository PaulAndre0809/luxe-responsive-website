import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { SlidersHorizontal } from 'lucide-react'

const categories = ['All', 'sale', 'new', 'women', 'bags', 'shoes', 'beauty', 'men', 'baby', 'home', 'designers']
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest']
const validCategories = new Set(['all', 'sale', 'new', 'women', 'bags', 'shoes', 'beauty', 'men', 'baby', 'home', 'designers'])

export default function ProductList() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900)
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1200)
  const [searchParams, setSearchParams] = useSearchParams()
  const catParamRaw = (searchParams.get('cat') || 'all').toLowerCase()
  const catParam = validCategories.has(catParamRaw) ? catParamRaw : 'all'
  const searchParam = searchParams.get('search') || ''

  const activeCategory = catParam === 'all' ? 'All' : catParam
  const [sort, setSort] = useState('Featured')
  const [maxPrice, setMaxPrice] = useState(15000)

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 900)
      setIsTablet(window.innerWidth < 1200)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleCategoryChange = (cat: string) => {
    const next = new URLSearchParams(searchParams)
    if (cat === 'All') {
      next.delete('cat')
    } else {
      next.set('cat', cat)
    }
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (searchParam) list = list.filter(p => p.name.toLowerCase().includes(searchParam.toLowerCase()) || p.brand.toLowerCase().includes(searchParam.toLowerCase()))
    if (activeCategory === 'sale') {
      list = list.filter(p => p.originalPrice || (p.tag && p.tag.toLowerCase().includes('sale')))
    } else if (activeCategory === 'new') {
      list = list.filter(p => p.tag && p.tag.toLowerCase().includes('new'))
    } else if (activeCategory !== 'All' && activeCategory !== 'designers') {
      list = list.filter(p => p.category === activeCategory)
    }
    list = list.filter(p => p.price <= maxPrice)
    if (sort === 'Price: Low to High') list.sort((a, b) => a.price - b.price)
    if (sort === 'Price: High to Low') list.sort((a, b) => b.price - a.price)
    if (sort === 'Newest') list.sort((a, b) => b.id - a.id)
    return list
  }, [activeCategory, sort, maxPrice, searchParam])

  return (
    <div style={{ background: '#fafaf8', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ padding: isMobile ? '24px 16px 16px' : '48px 60px 32px', borderBottom: '1px solid #e8e4de' }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '8px' }}>
          {searchParam ? 'Search Results' : 'Browse'}
        </p>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'flex-end', justifyContent: 'space-between', gap: isMobile ? '8px' : '0' }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? '34px' : '44px', fontWeight: 300, fontStyle: 'italic' }}>
            {searchParam ? `"${searchParam}"` : activeCategory === 'All' ? 'All Products' : activeCategory === 'new' ? 'New In' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </h1>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#8a8680' }}>{filtered.length} items</span>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ padding: isMobile ? '0 4px' : '0 60px', borderBottom: '1px solid #e8e4de', display: 'flex', gap: '0', overflowX: 'auto' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => handleCategoryChange(cat)} style={{ background: 'none', border: 'none', padding: '16px 20px', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: activeCategory === cat ? '#0a0a0a' : '#8a8680', borderBottom: activeCategory === cat ? '2px solid #b8975a' : '2px solid transparent', transition: 'all 0.2s ease', whiteSpace: 'nowrap' }}>
            {cat === 'new' ? 'New In' : cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '0' }}>

        {/* Sidebar filters */}
        <aside style={{ width: isMobile ? '100%' : '240px', flexShrink: 0, padding: isMobile ? '16px' : '32px 32px', borderRight: isMobile ? 'none' : '1px solid #e8e4de', borderBottom: isMobile ? '1px solid #e8e4de' : 'none', minHeight: isMobile ? 'auto' : '100vh' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px', color: '#0a0a0a', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <SlidersHorizontal size={12} /> Filters
          </p>

          {/* Price range */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px', color: '#0a0a0a' }}>Price Range</p>
            <input type="range" min={500} max={15000} step={500} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#b8975a', marginBottom: '8px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#8a8680' }}>AED 0</span>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#0a0a0a' }}>AED {maxPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Sort */}
          <div>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px', color: '#0a0a0a' }}>Sort By</p>
            {sortOptions.map(opt => (
              <button key={opt} onClick={() => setSort(opt)} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '8px 0', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: sort === opt ? '#b8975a' : '#4a4744', fontWeight: sort === opt ? 500 : 400, transition: 'color 0.2s' }}>
                {opt}
              </button>
            ))}
          </div>
        </aside>

        {/* Products grid */}
        <div style={{ flex: 1, padding: isMobile ? '16px' : '32px 40px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', color: '#8a8680', marginBottom: '12px' }}>No products found</p>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#8a8680' }}>Try adjusting your filters</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? '20px' : '28px' }}>
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}