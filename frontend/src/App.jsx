
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        return response.json()
      })
      .then((data) => {
        setProducts(data.products || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <main>
      <h1>E-commerce Products</h1>

      {loading && <p>Loading products...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>No products found.</p>
      )}

      <section>
        {products.map((product) => (
          <article key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>
            <p>Stock: {product.stock}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default App

