// src/components/ProductSearch.jsx
import { useState, useEffect, useRef } from 'react';

function ProductSearch() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const timeoutRef = useRef(null);
  const abortRef = useRef(null);

  const searchProducts = async (query) => {
    if (abortRef.current) abortRef.current.abort();
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    abortRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
        { signal: abortRef.current.signal }
      );

      if (!response.ok) throw new Error('Сетевая ошибка');

      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (searchTerm.trim()) {
      timeoutRef.current = setTimeout(() => searchProducts(searchTerm), 500);
    } else {
      setProducts([]);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchTerm]);

  return (
    <div className="product-search">
      <h2>Поиск продуктов</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Например: iPhone, Laptop..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading && <span> ⌛ </span>}
      </div>

      {error && <p className="error">Ошибка: {error}</p>}

      {products.length > 0 ? (
        <div className="products-grid">
          {products.map(p => (
            <div key={p.id} className="product-card">
              <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <h4>{p.title}</h4>
              <p>${p.price}</p>
            </div>
          ))}
        </div>
      ) : (
        searchTerm.trim() && !loading && <p>Ничего не найдено</p>
      )}
    </div>
  );
}

export default ProductSearch;