/* eslint-disable testing-library/no-node-access */
import React from 'react'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'

import ProductPage from '../ProductPage'
import productsReducer from '../../store/ProductsSlice'
import transactionReducer from '../../store/TransactionSlice'
import api from '../../services/ApiServices'

// ----- mocks --------------------------------------------------

// 1. mock de productos devueltos por la API
const mockProducts = [
  { id: 1, name: 'Taza Wompi',   description: 'Negra', price: 25000, stock: 5 },
  { id: 2, name: 'Camiseta XL',  description: 'Blanca', price: 59000, stock: 3 },
]

// 2. mock del servicio API
jest.mock('../../services/ApiServices', () => ({
  __esModule: true,
  default: {
    getProducts: jest.fn(),
  },
}))

// 3. mock del modal (solo renderiza sus children)
jest.mock('../../components/ModalCreditCardInfo', () => ({
  __esModule: true,
  default: ({ open, onSubmit }) =>
    open ? (
      <button
        data-testid="modal-submit"
        onClick={() => onSubmit({ cardNumber: '4111111111111111' })}
      >
        submit‑modal
      </button>
    ) : null,
}))

/* ------------------------------------------------------------ */
function renderWithProviders(ui) {
  const store = configureStore({
    reducer: { products: productsReducer, transaction: transactionReducer },
  })

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={ui} />
          {/* ruta ficticia para comprobar la navegación */}
          <Route
            path="/summary"
            element={<div data-testid="summary-page">Summary</div>}
          />
        </Routes>
      </MemoryRouter>
    </Provider>,
  )
}

/* ------------------------------------------------------------ */
describe('<ProductPage />', () => {
  beforeEach(() => {
    // cada test empieza con la API devolviendo los productos mock
    api.getProducts.mockResolvedValue(mockProducts)
  })

  it('muestra los productos obtenidos de la API', async () => {
    renderWithProviders(<ProductPage />)

    // espera a que se pinten los nombres
    expect(await screen.findByText('Taza Wompi')).toBeInTheDocument()
    expect(screen.getByText('Camiseta XL')).toBeInTheDocument()
  })

  it('agrega productos al carrito y actualiza total', async () => {
    renderWithProviders(<ProductPage />)

    // click en "Añadir" de la primera tarjeta (Taza Wompi)
    const addButtons = await screen.findAllByRole('button', { name: /añadir/i })
    fireEvent.click(addButtons[0])

    // el item aparece en el carrito con cantidad ×1
    expect(screen.getByText(/Taza Wompi × 1/)).toBeInTheDocument()
    // total debe ser 25000
    expect(screen.getByText('$25000')).toBeInTheDocument()
  })

  it('activa el botón de pagar y navega a /summary tras enviar la tarjeta', async () => {
    renderWithProviders(<ProductPage />)

    // Añadimos un producto
    const addButtons = await screen.findAllByRole('button', { name: /añadir/i })
    fireEvent.click(addButtons[0])

    // Botón checkout debe habilitarse
    const payBtn = screen.getByRole('button', { name: /pagar con tarjeta/i })
    expect(payBtn).toBeEnabled()

    // Abrimos el modal
    fireEvent.click(payBtn)

    // Hacemos click en el submit simulado del modal
    fireEvent.click(screen.getByTestId('modal-submit'))

    // Ahora deberíamos estar en la "página" de resumen
    await waitFor(() =>
      expect(screen.getByTestId('summary-page')).toBeInTheDocument(),
    )
  })
})
