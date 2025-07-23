// src/pages/SummaryPage.jsx

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import api from '../services/ApiServices'
import '../styles/SummaryPage.css'

// Helper para detectar el tipo de tarjeta
const getCardType = (num = '') => {
  if (/^4/.test(num)) return 'Visa'
  if (/^5[1-5]/.test(num) || /^2(2[2-9]|[3-6]\d|7[01]|720)/.test(num)) return 'MasterCard'
  return 'Desconocido'
}

export default function SummaryPage() {
  const navigate = useNavigate()
  const { products = [], card = {} } = useSelector(s => s.transaction)
  const { cardNumber = '', name = '', expiry = '', email, address, city, phone } = card

  const [payloadJson, setPayloadJson] = useState('')
  const [responseJson, setResponseJson] = useState('')
  const [loading, setLoading] = useState(false)

  // Loader si falta info
  if (!products.length || !cardNumber || !address) {
    return (
      <div className="summary-page__loader">
        Cargando resumen…
      </div>
    )
  }

  // Cálculo de montos
  const productAmount = products.reduce((sum, p) => sum + p.price * p.qty, 0)
  const baseFee = 2000
  const deliveryFee = 5000
  const total = productAmount + baseFee + deliveryFee

  // Datos de tarjeta
  const cardType = getCardType(cardNumber)
  const last4 = cardNumber.slice(-4)

  const handleConfirm = async () => {
    setLoading(true);

    // Desestructuro todo de una vez, incluyendo document y scheduledDate
    const {
      cardNumber,
      name,
      expiry,
      cvc,
      email,
      address,
      city,
      phone,
      document,
      scheduledDate: schedDateFromState,
    } = card;

    // 1) First/Last name
    const [firstName, ...rest] = name.trim().split(' ');
    const lastName = rest.join(' ') || '';

    // 2) Calcular fecha de entrega: uso la que venga en state o ahora +1 día
    const scheduledDate =
      schedDateFromState ||
      new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    // 3) Construir payload
    const payload = {
      description: products.map(p => `${p.name}×${p.qty}`).join(', '),
      amount: total,
      date: new Date().toISOString(),
      status: 'pending',

      // Cliente
      firstName,
      lastName,
      document,
      phone,
      customerEmail: email,

      // Entrega
      address,
      scheduledDate,

      // Items para stock
      items: products.map(p => ({
        name: p.name,
        quantity: p.qty,
      })),

      // Tarjeta (opcional)
      cardNumber,
      cardCvc: cvc,
      cardExpMonth: expiry.split('/')[0],
      cardExpYear: '20' + expiry.split('/')[1],
    };

    // 4) Mostrar payload en pantalla
    setPayloadJson(JSON.stringify(payload, null, 2));

    try {
      // 5) Llamar al API
      const response = await api.createTransaction(payload);
      console.log('Transacción creada:', response);
      // 6) Mostrar respuesta recibida
      setResponseJson(JSON.stringify(response, null, 2));

      // 7) Navegar
      navigate(`/status/${response.id}`);
    } catch (err) {
      console.error('Error al crear transacción:', err);
      alert('Error al procesar el pago.');
      setLoading(false);
    }
  };


  return (
    <div className="summary-backdrop">
      <div className="summary-card">
        <h2 className="summary-card__title">Resumen de pago</h2>

        {/* Datos de pago */}
        <section className="summary-section">
          <h3 className="summary-section__header">Datos de pago</h3>
          <div className="summary-row">
            <span>Medio</span><span>{cardType}</span>
          </div>
          <div className="summary-row">
            <span>Tarjeta</span><span>•••• •••• •••• {last4}</span>
          </div>
          <div className="summary-row">
            <span>Nombre</span><span>{name}</span>
          </div>
          <div className="summary-row summary-row--mb">
            <span>Expiración</span><span>{expiry}</span>
          </div>
        </section>

        {/* Productos */}
        <section className="summary-section">
          <h3 className="summary-section__header">Productos</h3>
          {products.map(item => (
            <div className="summary-product" key={item.id}>
              <div className="summary-product__info">
                <strong>{item.name}</strong>
                <p className="summary-product__desc">{item.description}</p>
              </div>
              <div className="summary-product__qty">×{item.qty}</div>
            </div>
          ))}
        </section>

        {/* Datos de entrega */}
        <section className="summary-section">
          <h3 className="summary-section__header">Datos de entrega</h3>
          <p className="summary-text">Correo: {email}</p>
          <p className="summary-text">Dirección: {address}</p>
          <p className="summary-text">Ciudad: {city}</p>
          <p className="summary-text summary-text--mb">Teléfono: {phone}</p>
        </section>

        {/* Totales */}
        <section className="summary-section summary-section--totals">
          <div className="summary-row">
            <span>Productos</span><span>${productAmount}</span>
          </div>
          <div className="summary-row">
            <span>Tarifa base</span><span>${baseFee}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span><span>${deliveryFee}</span>
          </div>
          <div className="summary-row summary-row--bold">
            <span>Total</span><span>${total}</span>
          </div>
        </section>

        {/* Botón de pago */}
        <button
          className="summary-button"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Pagar ahora'}
        </button>
      </div>
    </div>
  )
}
