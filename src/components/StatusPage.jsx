import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import api from '../services/ApiServices'
import '../styles/StatusPage.css'

export default function StatusPage() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [tx, setTx] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.getTransactionStatus(id)
            .then(data => setTx(data))
            .catch(() => setTx({ status: 'error' }))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) {
        return <div className="status-page__loader">Consultando estado de pago…</div>
    }

    if (tx.status === 'error') {
        return (
            <div className="status-backdrop">
                <div className="status-card">
                    <h2 className="status-card__title">Pago Fallido</h2>
                    <p className="status-text status-text--error">
                        No se encontró la transacción.
                    </p>
                    <button className="status-button" onClick={() => navigate('/')}>
                        Volver a productos
                    </button>
                </div>
            </div>
        )
    }

    const formattedDate = new Date(tx.date).toLocaleString()
    const success = tx.status === 'completed'

    return (
        <div className="status-backdrop">
            <div className="status-card">
                <h2 className="status-card__title">
                    {success ? '¡Pago Exitoso!' : 'Pago Fallido'}
                </h2>
                <div className="status-text"><strong>ID:</strong> {tx.id}</div>
                <div className="status-text">
                    <strong>Descripción:</strong> {tx.description}
                </div>
                <div className="status-text"><strong>Total:</strong> ${tx.amount}</div>
                <div className="status-text"><strong>Fecha:</strong> {formattedDate}</div>
                <button className="status-button" onClick={() => navigate('/')}>
                    Volver a productos
                </button>
            </div>
        </div>
    )
}
