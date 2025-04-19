import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const PurchaseHistory = () => {
  const { user } = useAuth();
  const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (user) { 
      axios
        .get(`/api/orders/user/${user.id}`)
        .then((response) => {
          setPurchaseHistory(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch purchase history");
          setLoading(false);
        });
    }
  }, [user]);

  const filterOrders = (status: string) => {
    setFilter(status);
  };

  const filteredOrders = filter === 'All' ? purchaseHistory : purchaseHistory.filter(order => order.status === filter);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Your Orders</h1>

      {/* Filter buttons */}
      <div>
        <button onClick={() => filterOrders('All')}>All</button>
        <button onClick={() => filterOrders('Shipped')}>Shipped</button>
        <button onClick={() => filterOrders('Delivered')}>Delivered</button>
        <button onClick={() => filterOrders('Cancelled')}>Cancelled</button>
        <button onClick={() => filterOrders('Returned')}>Returned</button>
      </div>

      <div>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <div key={index} style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
              <h2>Order Status: {order.status}</h2>
              <img src={order.bookImageUrl} alt={order.bookTitle} style={{ width: "100px" }} />
              <div>
                <p>Order No: #{order.orderNumber}</p>
                <p>Order Date: {order.orderDate}</p>
                <p>Books Total: {order.booksTotal}</p>
                <p>Total Price: ${order.totalPrice}</p>
              </div>
              <div>
                <button>Cancel</button>
                <button>View</button>
              </div>
            </div>
          ))
        ) : (
          <p>No purchase history found.</p>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
