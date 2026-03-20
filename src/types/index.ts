export type Product = {
  id: number
  name: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  image2?: string
  tag?: string
  category: string
  description?: string
  sizes?: string[]
  colors?: string[]
  rating?: number
  reviews?: number
}

export type CartItem = {
  product: Product
  quantity: number
  size?: string
}