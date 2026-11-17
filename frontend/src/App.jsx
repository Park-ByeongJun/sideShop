import { useEffect, useState } from 'react'

export default function App() {
  const [products, setProducts] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    async function loadProducts() {
      try {
        const response = await fetch('/api/products', { signal: controller.signal })
        if (!response.ok) throw new Error('Product request failed')
        setProducts(await response.json())
      } catch {
        if (!controller.signal.aborted) setError(true)
      }
    }
    loadProducts()
    return () => controller.abort()
  }, [])

  return (
    <main>
      <h1>상품 목록</h1>
      {error && <p role="alert">상품 목록을 불러오지 못했습니다.</p>}
      {!error && products === null && <p>상품을 불러오는 중입니다.</p>}
      {products?.length === 0 && <p>등록된 상품이 없습니다.</p>}
      {products?.length > 0 && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} · {product.price.toLocaleString('ko-KR')}원
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
