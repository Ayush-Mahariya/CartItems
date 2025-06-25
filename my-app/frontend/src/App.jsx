import { useEffect, useState } from 'react';
import axios from 'axios';

const ITEMS = [
  { name: 'Laptop', price: 80000 },
  { name: 'Phone', price: 40000 },
  { name: 'Headphones', price: 16000 },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = async (item) => {
    await axios.post('http://localhost:5000/cart', item);
    fetchCart();
  };

  const fetchCart = async () => {
    const res = await axios.get('http://localhost:5000/cart');
    setCart(res.data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">🛍️ Product List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {ITEMS.map((item, index) => (
          <div key={index} className="border rounded-xl p-4 shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600 mb-2">Price: ₹{item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-green-700">🛒 Cart Items</h2>
      <div className="space-y-3">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="bg-gray-100 p-4 rounded-md shadow-sm flex justify-between items-center">
              <div>{item.name} - ₹{item.price}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
