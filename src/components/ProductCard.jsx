import '../styles/ProductCard.css'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      {/* 1. Detalles del producto ocupa todo el espacio */}
      <div className="product-card__details">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <p className="product-card__price">${product.price}</p>
        <p className="product-card__stock">Stock: {product.stock}</p>
      </div>

      {/* 2. Botón alineado a la derecha */}
      <div className="product-card__footer">
        <button
          className="product-card__button"
          onClick={() => onAdd(product)}
        >
          Añadir
        </button>
      </div>
    </div>
  )
}
