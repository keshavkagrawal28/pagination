import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 12;

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
        (page - 1) * productsPerPage
      }`
    );
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / productsPerPage));
    }
  };

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className='App'>
      {products.length > 0 && (
        <div className='products'>
          {products.map((product) => {
            return (
              <span className='products__single' key={product.id}>
                <img src={product.thumbnail} alt={product.title}></img>
                <span>{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className='pagination'>
          <span
            onClick={() => selectPageHandler(page - 1)}
            style={page === 1 ? { visibility: 'hidden' } : {}}
          >
            Previous
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                key={`pageno-${i + 1}`}
                className={page === i + 1 ? 'pagination__selected' : ''}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPageHandler(page + 1)}
            style={page === totalPages ? { visibility: 'hidden' } : {}}
          >
            Next
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
