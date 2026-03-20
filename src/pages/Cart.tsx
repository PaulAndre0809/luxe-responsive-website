import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { Trash2, Plus, Minus } from 'lucide-react'

export default function Cart() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900)
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1200)
  const { items, removeItem, updateQty, total, count } = useCartStore()
  const cartTotal = total()
  const cartCount = count()
  const shipping = cartTotal >= 500 ? 0 : 30

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 900)
      setIsTablet(window.innerWidth < 1200)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (cartCount === 0) return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fafaf8' }}>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? '36px' : '48px', fontWeight: 300, fontStyle: 'italic', marginBottom: '12px', textAlign: 'center' }}>Your bag is empty</p>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#8a8680', marginBottom: '32px' }}>Discover our curated luxury collection</p>
      <Link to="/products" style={{ display: 'inline-block', padding: '14px 48px', background: '#0a0a0a', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none' }}>
        Start Shopping
      </Link>
    </div>
  )

  return (
    <div style={{ background: '#fafaf8', minHeight: '100vh', padding: isMobile ? '28px 16px' : '48px 60px' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '8px' }}>Review</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? '34px' : '44px', fontWeight: 300, fontStyle: 'italic' }}>Shopping Bag ({cartCount})</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 380px', gap: isTablet ? '24px' : '60px', alignItems: 'start' }}>

        {/* Items */}
        <div>
          {items.map(item => (
            <div key={`${item.product.id}-${item.size}`} style={{ display: 'grid', gridTemplateColumns: isMobile ? '96px 1fr' : '140px 1fr', gap: isMobile ? '14px' : '24px', padding: '24px 0', borderBottom: '1px solid #e8e4de' }}>
              <Link to={`/product/${item.product.id}`}>
                <img src={item.product.image} alt={item.product.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }} />
              </Link>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '6px' }}>{item.product.brand}</p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? '18px' : '22px', fontWeight: 400, marginBottom: '6px' }}>{item.product.name}</p>
                  {item.size && <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#8a8680', marginBottom: '4px' }}>Size: {item.size}</p>}
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '15px', fontWeight: 500, marginBottom: '16px' }}>AED {item.product.price.toLocaleString()}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: isMobile ? '10px' : '0' }}>
                  {/* Qty */}
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #c8c4bc' }}>
                    <button onClick={() => updateQty(item.product.id, item.quantity - 1, item.size)} style={{ width: '36px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Minus size={12} />
                    </button>
                    <span style={{ width: '36px', textAlign: 'center', fontFamily: 'Montserrat, sans-serif', fontSize: '12px' }}>{item.quantity}</span>
                    <button onClick={() => updateQty(item.product.id, item.quantity + 1, item.size)} style={{ width: '36px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Plus size={12} />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.product.id, item.size)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: '#8a8680', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '1px' }}>
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div style={{ background: '#f5f2ed', padding: isMobile ? '24px' : '36px', position: isTablet ? 'static' : 'sticky', top: '120px' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>Order Summary</p>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#4a4744' }}>Subtotal ({cartCount} items)</span>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px' }}>AED {cartTotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#4a4744' }}>Shipping</span>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: shipping === 0 ? '#2d6a4f' : '#0a0a0a' }}>
              {shipping === 0 ? 'FREE' : `AED ${shipping}`}
            </span>
          </div>

          {cartTotal < 500 && (
            <div style={{ background: '#faeeda', padding: '12px', marginBottom: '20px', borderLeft: '2px solid #b8975a' }}>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#b8975a' }}>Add AED {(500 - cartTotal).toLocaleString()} more for free shipping</p>
            </div>
          )}

          <div style={{ borderTop: '1px solid #c8c4bc', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', marginBottom: '28px' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px' }}>Total</span>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 500 }}>AED {(cartTotal + shipping).toLocaleString()}</span>
          </div>

          <Link to="/checkout" style={{ display: 'block', width: '100%', padding: '16px', background: '#0a0a0a', color: '#fff', textAlign: 'center', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.3s' }}>
            Proceed to Checkout
          </Link>

          <Link to="/products" style={{ display: 'block', textAlign: 'center', marginTop: '16px', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: '#8a8680', textDecoration: 'none', letterSpacing: '1px' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}