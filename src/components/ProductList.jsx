import '../styles/ProductList.css'
import ProductCard from './ProductCard'

export default function ProductList({ products, onAdd }) {
  return (
    <div className="product-list">
      {products.map(prod => (
        <ProductCard key={prod.id} product={prod} onAdd={onAdd} />
      ))}
    </div>
  )
}
