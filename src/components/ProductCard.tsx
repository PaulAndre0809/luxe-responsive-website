import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import type { Product } from '../types'

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ position: 'relative' }}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#0a0a0a', display: 'block' }}>

        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '14px', aspectRatio: '3/4' }}>
          <img
            src={hovered && product.image2 ? product.image2 : product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'all 0.7s cubic-bezier(0.25,0.46,0.45,0.94)' }}
          />

          {/* Tag */}
          {product.tag && (
            <div style={{ position: 'absolute', top: '10px', left: '10px', background: product.tag === 'SALE' ? '#8B0000' : '#0a0a0a', color: product.tag === 'SALE' ? '#fff' : '#b8975a', fontFamily: 'Montserrat, sans-serif', fontSize: '8px', fontWeight: 600, letterSpacing: '1.5px', padding: '3px 8px' }}>
              {product.tag}
            </div>
          )}

          {/* Discount */}
          {discount && (
            <div style={{ position: 'absolute', top: product.tag ? '34px' : '10px', left: '10px', background: '#8B0000', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '8px', fontWeight: 600, letterSpacing: '1px', padding: '3px 8px' }}>
              {discount}% OFF
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); setWishlisted(!wishlisted) }}
            style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,255,255,0.92)', border: 'none', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(-6px)', transition: 'all 0.3s ease', fontSize: '16px', color: wishlisted ? '#b8975a' : '#0a0a0a' }}
          >
            {wishlisted ? '♥' : '♡'}
          </button>

          {/* Quick Add */}
          <button
            onClick={handleQuickAdd}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: added ? '#b8975a' : 'rgba(10,10,10,0.88)', border: 'none', padding: '14px', cursor: 'pointer', opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(8px)', transition: 'all 0.3s ease' }}
          >
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: '#fff' }}>
              {added ? '✓ Added to Bag' : 'Quick Add'}
            </span>
          </button>
        </div>

        {/* Info */}
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', color: '#8a8680', marginBottom: '5px', textTransform: 'uppercase' }}>{product.brand}</p>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 400, marginBottom: '8px', lineHeight: 1.4 }}>{product.name}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 500 }}>AED {product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#8a8680', textDecoration: 'line-through' }}>AED {product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </Link>
    </div>
  )
}