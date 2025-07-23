import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setProducts } from '../store/ProductsSlice'
import { setTransaction } from '../store/TransactionSlice'
import ProductList from '../components/ProductList'
import ModalCreditCardInfo from '../components/ModalCreditCardInfo'
import api from '../services/ApiServices'

import '../styles/ProductPage.css'

export default function ProductPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelector(state => state.products)

  const [cart, setCart] = useState([])
  const [cardOpen, setCardOpen] = useState(false)

  useEffect(() => {
    api.getProducts().then(data => dispatch(setProducts(data)))
  }, [dispatch])

  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id)
      return found
        ? prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
        : [...prev, { ...product, qty: 1 }]
    })
  }

  const handleCheckout = () => {
    if (!cart.length) return
    setCardOpen(true)
  }

  const handleCardSubmit = (cardData) => {
    dispatch(setTransaction({ products: cart, card: cardData }))
    setCardOpen(false)
    navigate('/summary')
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0)

  return (
    <>
      <div className="product-page">
        <h1 className="product-page__title">Productos</h1>
        <div className="product-list">
          <ProductList products={products} onAdd={addToCart} />
        </div>

        <div className="cart">
          <h2 className="cart__title">Carrito</h2>

          {cart.length === 0 ? (
            <div className="cart__empty">Aún no tienes productos.</div>
          ) : (
            <div className="cart__items">
              {cart.map(item => (
                <div className="cart__item" key={item.id}>
                  <span>{item.name} × {item.qty}</span>
                  <span>${item.price * item.qty}</span>
                </div>
              ))}
            </div>
          )}

          <div className="cart__total">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button
            className="checkout-button"
            disabled={!cart.length}
            onClick={handleCheckout}
          >
            Pagar con tarjeta
          </button>
        </div>
      </div>

      <ModalCreditCardInfo
        open={cardOpen}
        onClose={() => setCardOpen(false)}
        onSubmit={handleCardSubmit}
      />
    </>
  )
}
