import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCartStore } from '../store/cartStore'
import ProductCard from '../components/ProductCard'
import { Star, ChevronLeft } from 'lucide-react'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))
  const addItem = useCartStore(s => s.addItem)

  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [added, setAdded] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [wishlisted, setWishlisted] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [id])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!product) return (
    <div style={{ padding: isMobile ? '40px 16px' : '80px', textAlign: 'center' }}>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px' }}>Product not found</p>
      <Link to="/products" style={{ display: 'inline-block', marginTop: '20px', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#0a0a0a' }}>Back to Products</Link>
    </div>
  )

  const images = [product.image, product.image2 || product.image]
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null

  const handleAddToBag = () => {
    if (product.sizes && product.sizes.length > 1 && !selectedSize) {
      setSizeError(true)
      return
    }
    addItem(product, selectedSize)
    setAdded(true)
    setSizeError(false)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div style={{ background: '#fafaf8' }}>

      {/* Breadcrumb */}
      <div style={{ padding: isMobile ? '14px 16px' : '20px 60px', borderBottom: '1px solid #e8e4de' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: '#8a8680', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: '#c8c4bc', fontSize: '10px' }}>/</span>
          <Link to="/products" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: '#8a8680', textDecoration: 'none' }}>Products</Link>
          <span style={{ color: '#c8c4bc', fontSize: '10px' }}>/</span>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: '#0a0a0a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: isMobile ? '120px' : 'none' }}>{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0', maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '0 16px 60px' : '0 60px 80px' }}>

        {/* Images */}
        <div style={{ paddingTop: '32px', paddingRight: isMobile ? '0' : '60px' }}>
          <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '12px', aspectRatio: '3/4' }}>
            <img src={images[activeImage]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.4s ease' }} />
            {product.tag && (
              <div style={{ position: 'absolute', top: '16px', left: '16px', background: product.tag === 'SALE' ? '#8B0000' : '#0a0a0a', color: product.tag === 'SALE' ? '#fff' : '#b8975a', fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', padding: '4px 10px' }}>{product.tag}</div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {images.map((img, i) => (
              <div key={i} onClick={() => setActiveImage(i)} style={{ width: '80px', height: '100px', overflow: 'hidden', cursor: 'pointer', border: activeImage === i ? '1px solid #b8975a' : '1px solid transparent', transition: 'border-color 0.2s' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{ paddingTop: isMobile ? '24px' : '40px', paddingLeft: isMobile ? '0' : '40px' }}>
          <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: '#8a8680', textDecoration: 'none', marginBottom: '24px', letterSpacing: '1px' }}>
            <ChevronLeft size={12} /> Back
          </Link>

          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '10px' }}>{product.brand}</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? '30px' : '38px', fontWeight: 400, lineHeight: 1.2, marginBottom: '16px' }}>{product.name}</h1>

          {/* Rating */}
          {product.rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={12} fill={i <= Math.round(product.rating!) ? '#b8975a' : 'none'} color={i <= Math.round(product.rating!) ? '#b8975a' : '#c8c4bc'} />
                ))}
              </div>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#8a8680' }}>{product.rating} ({product.reviews} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 400 }}>AED {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', color: '#8a8680', textDecoration: 'line-through' }}>AED {product.originalPrice.toLocaleString()}</span>
                <span style={{ background: '#8B0000', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 600, padding: '3px 8px' }}>{discount}% OFF</span>
              </>
            )}
          </div>

          <div style={{ width: '40px', height: '1px', background: '#b8975a', marginBottom: '28px' }} />

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>Colour: <span style={{ color: '#b8975a' }}>{selectedColor || 'Select'}</span></p>
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.colors.map(c => (
                  <button key={c} onClick={() => setSelectedColor(c)} style={{ padding: '7px 14px', border: selectedColor === c ? '1px solid #b8975a' : '1px solid #c8c4bc', background: 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: selectedColor === c ? '#b8975a' : '#4a4744', transition: 'all 0.2s' }}>{c}</button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Size: <span style={{ color: '#b8975a' }}>{selectedSize || 'Select'}</span></p>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: '#8a8680', cursor: 'pointer', borderBottom: '1px solid #8a8680' }}>Size Guide</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {product.sizes.map(sz => (
                  <button key={sz} onClick={() => { setSelectedSize(sz); setSizeError(false) }} style={{ width: '52px', height: '44px', border: selectedSize === sz ? '1px solid #b8975a' : '1px solid #c8c4bc', background: selectedSize === sz ? '#b8975a' : 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: selectedSize === sz ? '#fff' : '#4a4744', transition: 'all 0.2s' }}>{sz}</button>
                ))}
              </div>
              {sizeError && <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#8B0000', marginTop: '8px' }}>Please select a size</p>}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            <button onClick={handleAddToBag} style={{ flex: 1, padding: '16px', background: added ? '#b8975a' : '#0a0a0a', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', transition: 'all 0.3s ease' }}>
              {added ? '✓ Added to Bag' : 'Add to Bag'}
            </button>
            <button onClick={() => setWishlisted(!wishlisted)} style={{ width: '52px', height: '52px', border: '1px solid #c8c4bc', background: wishlisted ? '#faeeda' : 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', fontSize: '20px', color: wishlisted ? '#b8975a' : '#0a0a0a' }}>
              {wishlisted ? '♥' : '♡'}
            </button>
          </div>

          {/* Description */}
          {product.description && (
            <div style={{ padding: '24px 0', borderTop: '1px solid #e8e4de' }}>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Description</p>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#4a4744' }}>{product.description}</p>
            </div>
          )}

          {/* Delivery */}
          <div style={{ padding: '20px', background: '#f5f2ed', marginTop: '24px' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 500, marginBottom: '8px' }}>Delivery & Returns</p>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#4a4744', lineHeight: 1.7, fontWeight: 300 }}>
              Free standard delivery on orders over AED 500.<br />
              Same-day delivery available in Dubai.<br />
              Free returns within 30 days.
            </p>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div style={{ padding: isMobile ? '40px 16px' : '60px', borderTop: '1px solid #e8e4de' }}>
          <div style={{ textAlign: 'center', marginBottom: isMobile ? '28px' : '40px' }}>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '10px' }}>You May Also Like</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? '30px' : '38px', fontWeight: 300, fontStyle: 'italic' }}>Related Products</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: isMobile ? '14px' : '24px' }}>
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}