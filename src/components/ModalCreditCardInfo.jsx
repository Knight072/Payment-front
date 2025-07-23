import React, { useState, useEffect } from 'react'
import '../styles/ModalCreditCardInfo.css'
import visaLogo from '../assets/visa.png'
import mastercardLogo from '../assets/mastercard.png'

// Helpers de validación
const isValidLuhn = (num) => {
    let sum = 0, alt = false
    for (let i = num.length - 1; i >= 0; i--) {
        let n = parseInt(num[i], 10)
        if (alt) {
            n *= 2
            if (n > 9) n -= 9
        }
        sum += n
        alt = !alt
    }
    return sum % 10 === 0
}

const getCardType = (num) => {
    if (/^4/.test(num)) return 'visa'
    if (/^5[1-5]/.test(num) || /^2(2[2-9]|[3-6]\d|7[01]|720)/.test(num)) return 'mastercard'
    return 'unknown'
}

const isValidExpiry = (exp) => {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) return false
    const [mm, yy] = exp.split('/').map(x => parseInt(x, 10))
    const now = new Date()
    const currentYear = now.getFullYear() % 100
    const currentMonth = now.getMonth() + 1
    return yy > currentYear || (yy === currentYear && mm >= currentMonth)
}

const isValidCvc = (cvc) => /^\d{3}$/.test(cvc)

export default function ModalCreditCardInfo({ open, onClose, onSubmit }) {
    const [form, setForm] = useState({
        cardNumber: '',
        name: '',
        expiry: '',
        cvc: '',
        document: '',
        email: '',
        address: '',
        city: '',
        phone: '',
    })
    const [errors, setErrors] = useState({})
    const [cardType, setCardType] = useState('unknown')

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }))
        if (field === 'cardNumber') {
            setCardType(getCardType(value))
        }
    }

    useEffect(() => {
        const e = {}
        if (form.cardNumber.length < 12 || !isValidLuhn(form.cardNumber)) e.cardNumber = 'Número inválido'
        if (!form.name.trim()) e.name = 'Nombre obligatorio'
        if (!isValidExpiry(form.expiry)) e.expiry = 'Fecha inválida'
        if (!isValidCvc(form.cvc)) e.cvc = 'CVC inválido'
        if (!form.document.trim()) e.document = 'N° Documento obligatorio'
        if (!form.email.trim()) e.email = 'Correo obligatorio'
        if (!form.address.trim()) e.address = 'Dirección obligatoria'
        if (!form.city.trim()) e.city = 'Ciudad obligatoria'
        if (!/^\d{7,10}$/.test(form.phone)) e.phone = 'Teléfono inválido'
        setErrors(e)
    }, [form])

    const canSubmit = Object.keys(errors).length === 0

    const handleSubmit = () => {
        if (!canSubmit) return
        onSubmit(form)
        onClose()
    }

    if (!open) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                <span className="sr-only">Ingreso de datos de tarjeta</span>
                <h2 className="modal-title">Datos de tarjeta</h2>

                {cardType !== 'unknown' && (
                    <img
                        className="card-logo"
                        src={cardType === 'visa' ? visaLogo : mastercardLogo}
                        alt={cardType === 'visa' ? 'Logo Visa' : 'Logo MasterCard'}
                    />
                )}

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Número de tarjeta"
                        maxLength={16}
                        value={form.cardNumber}
                        onChange={e => handleChange('cardNumber', e.target.value.replace(/\D/g, ''))}
                    />
                    {errors.cardNumber && <div className="input-error">{errors.cardNumber}</div>}
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Nombre en la tarjeta"
                        value={form.name}
                        onChange={e => handleChange('name', e.target.value)}
                    />
                    {errors.name && <div className="input-error">{errors.name}</div>}
                </div>

                <div className="input-row">
                    <div className="input-group half">
                        <input
                            type="text"
                            placeholder="MM/AA"
                            maxLength={5}
                            value={form.expiry}
                            onChange={e => handleChange('expiry', e.target.value)}
                        />
                        {errors.expiry && <div className="input-error">{errors.expiry}</div>}
                    </div>
                    <div className="input-group half">
                        <input
                            type="text"
                            placeholder="CVC"
                            maxLength={3}
                            value={form.cvc}
                            onChange={e => handleChange('cvc', e.target.value.replace(/\D/g, ''))}
                        />
                        {errors.cvc && <div className="input-error">{errors.cvc}</div>}
                    </div>
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Numero Documento"
                        value={form.document}
                        onChange={e => handleChange('document', e.target.value)}
                    />
                    {errors.document && <div className="input-error">{errors.document}</div>}
                </div>


                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Correo electrónico"
                        value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                    />
                    {errors.email && <div className="input-error">{errors.email}</div>}
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Dirección de envío"
                        value={form.address}
                        onChange={e => handleChange('address', e.target.value)}
                    />
                    {errors.address && <div className="input-error">{errors.address}</div>}
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Ciudad"
                        value={form.city}
                        onChange={e => handleChange('city', e.target.value)}
                    />
                    {errors.city && <div className="input-error">{errors.city}</div>}
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Teléfono"
                        maxLength={10}
                        value={form.phone}
                        onChange={e => handleChange('phone', e.target.value.replace(/\D/g, ''))}
                    />
                    {errors.phone && <div className="input-error">{errors.phone}</div>}
                </div>

                <div className="modal-buttons">
                    <button className="button gray" onClick={onClose}>Cancelar</button>
                    <button className="button active" onClick={handleSubmit} disabled={!canSubmit}>Continuar</button>
                </div>
            </div>
        </div>
    )
}
