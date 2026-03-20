import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { Check } from 'lucide-react'

export default function Checkout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900)
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1200)
  const { items, total, count, clearCart } = useCartStore()
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details')
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', emirate: '', card: '', expiry: '', cvv: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const cartTotal = total()
  const shipping = cartTotal >= 500 ? 0 : 30

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 900)
      setIsTablet(window.innerWidth < 1200)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (count() === 0 && step !== 'success') {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fafaf8' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', marginBottom: '20px' }}>Your bag is empty</p>
        <Link to="/products" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#0a0a0a', textDecoration: 'none', borderBottom: '1px solid #0a0a0a', paddingBottom: '2px' }}>Shop Now</Link>
      </div>
    )
  }

  const validate = (s: 'details' | 'payment') => {
    const e: Record<string, string> = {}
    if (s === 'details') {
      if (!form.firstName) e.firstName = 'Required'
      if (!form.lastName) e.lastName = 'Required'
      if (!form.email || !form.email.includes('@')) e.email = 'Valid email required'
      if (!form.address) e.address = 'Required'
      if (!form.city) e.city = 'Required'
    }
    if (s === 'payment') {
      if (!form.card || form.card.length < 16) e.card = 'Valid card number required'
      if (!form.expiry) e.expiry = 'Required'
      if (!form.cvv || form.cvv.length < 3) e.cvv = 'Invalid CVV'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePlaceOrder = () => {
    if (!validate('payment')) return
    clearCart()
    setStep('success')
  }

  const field = (key: keyof typeof form, label: string, placeholder = '', type = 'text', half = false) => (
    <div style={{ gridColumn: isMobile ? 'span 1' : half ? 'span 1' : 'span 2' }}>
      <label style={{ display: 'block', fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px', color: errors[key] ? '#8B0000' : '#0a0a0a' }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        style={{ width: '100%', padding: '12px 14px', border: `1px solid ${errors[key] ? '#8B0000' : '#c8c4bc'}`, background: '#fafaf8', fontFamily: 'Montserrat, sans-serif', fontSize: '12px', outline: 'none', transition: 'border-color 0.2s' }}
        onFocus={e => (e.target.style.borderColor = '#b8975a')}
        onBlur={e => (e.target.style.borderColor = errors[key] ? '#8B0000' : '#c8c4bc')}
      />
      {errors[key] && <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', color: '#8B0000', marginTop: '4px' }}>{errors[key]}</p>}
    </div>
  )

  if (step === 'success') return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fafaf8', padding: isMobile ? '28px 20px' : '60px' }}>
      <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#b8975a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
        <Check size={32} color="#fff" />
      </div>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '12px' }}>Order Confirmed</p>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? '40px' : '48px', fontWeight: 300, fontStyle: 'italic', marginBottom: '16px', textAlign: 'center' }}>Thank You!</h1>
      <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '13px', color: '#8a8680', marginBottom: '40px', textAlign: 'center', maxWidth: '400px', lineHeight: 1.7 }}>Your order has been placed successfully. You will receive a confirmation email shortly.</p>
      <Link to="/" style={{ display: 'inline-block', padding: '14px 48px', background: '#0a0a0a', color: '#fff', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', textDecoration: 'none' }}>Continue Shopping</Link>
    </div>
  )

  return (
    <div style={{ background: '#fafaf8', minHeight: '100vh', padding: isMobile ? '28px 16px' : '48px 60px' }}>
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '8px' }}>Secure Checkout</p>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: isMobile ? '34px' : '44px', fontWeight: 300, fontStyle: 'italic' }}>Checkout</h1>
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0', marginBottom: '24px' }}>
        {['Delivery Details', 'Payment'].map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: (step === 'details' && i === 0) || (step === 'payment' && i <= 1) ? '#b8975a' : '#c8c4bc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 600, color: '#fff' }}>{i + 1}</span>
              </div>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 500, color: (step === 'details' && i === 0) || (step === 'payment' && i === 1) ? '#0a0a0a' : '#8a8680' }}>{s}</span>
            </div>
            {i === 0 && <div style={{ width: '60px', height: '1px', background: '#c8c4bc', margin: '0 12px' }} />}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '1fr 380px', gap: isTablet ? '24px' : '60px', alignItems: 'start' }}>

        {/* Form */}
        <div style={{ background: '#fff', padding: isMobile ? '20px' : '36px', border: '1px solid #e8e4de' }}>
          {step === 'details' ? (
            <>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>Delivery Information</p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                {field('firstName', 'First Name', 'Paul', 'text', true)}
                {field('lastName', 'Last Name', 'Smith', 'text', true)}
                {field('email', 'Email Address', 'paul@email.com', 'email')}
                {field('phone', 'Phone Number', '+971 50 000 0000', 'tel')}
                {field('address', 'Street Address', '123 Sheikh Zayed Road')}
                {field('city', 'City', 'Dubai', 'text', true)}
                {field('emirate', 'Emirate', 'Dubai', 'text', true)}
              </div>
              <button onClick={() => { if (validate('details')) setStep('payment') }} style={{ marginTop: '28px', width: '100%', padding: '16px', background: '#0a0a0a', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', transition: 'background 0.3s' }}>
                Continue to Payment
              </button>
            </>
          ) : (
            <>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>Payment Details</p>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                {field('card', 'Card Number', '1234 5678 9012 3456')}
                {field('expiry', 'Expiry Date', 'MM/YY', 'text', true)}
                {field('cvv', 'CVV', '123', 'text', true)}
              </div>
              <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '12px', marginTop: '28px' }}>
                <button onClick={() => setStep('details')} style={{ flex: 1, padding: '16px', background: 'none', color: '#0a0a0a', border: '1px solid #c8c4bc', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}>Back</button>
                <button onClick={handlePlaceOrder} style={{ flex: 2, padding: '16px', background: '#b8975a', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>

        {/* Summary */}
        <div style={{ background: '#f5f2ed', padding: isMobile ? '24px' : '32px', position: isTablet ? 'static' : 'sticky', top: '120px' }}>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Your Order</p>
          {items.map(item => (
            <div key={`${item.product.id}-${item.size}`} style={{ display: 'flex', gap: '14px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e0dcd6' }}>
              <img src={item.product.image} alt={item.product.name} style={{ width: '60px', height: '80px', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#b8975a', marginBottom: '4px' }}>{item.product.brand}</p>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', marginBottom: '4px', lineHeight: 1.4 }}>{item.product.name}</p>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', color: '#8a8680' }}>Qty: {item.quantity}</p>
              </div>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', fontWeight: 500 }}>AED {(item.product.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#4a4744' }}>Subtotal</span>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px' }}>AED {cartTotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: '#4a4744' }}>Shipping</span>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '12px', color: shipping === 0 ? '#2d6a4f' : '#0a0a0a' }}>{shipping === 0 ? 'FREE' : `AED ${shipping}`}</span>
          </div>
          <div style={{ borderTop: '1px solid #c8c4bc', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px' }}>Total</span>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 500 }}>AED {(cartTotal + shipping).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}