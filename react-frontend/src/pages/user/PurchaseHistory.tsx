import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Order } from "../../types/Order";

const PurchaseHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  type Tab = "All" | "Shipping" | "Delivered" | "Cancelled" | "Returned";
  const [filter, setFilter] = useState<Tab>("All");

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewError, setViewError] = useState<string | null>(null);

  const welcomeMessage = "Thank you for becoming our member.";
  const [displayedText, setDisplayedText] = useState("");
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(welcomeMessage.slice(0, i + 1));
      i++;
      if (i === welcomeMessage.length) {
        clearInterval(interval);
        setTimeout(() => setShowMessage(false), 1000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    axios
      .get<Order[]>(`/api/orders/user/${user.id}`)
      .then(({ data }) => setOrders(data))
      .catch(() => setError("Failed to load orders"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleView = async (order: Order) => {
    if (order.orderItems?.length) {
      setSelectedOrder(order);
      return;
    }
    setViewLoading(true);
    setViewError(null);
    try {
      const { data } = await axios.get<Order>(`/api/orders/${order.id}`);
      setSelectedOrder(data);
    } catch {
      setViewError("Failed to load order details");
    } finally {
      setViewLoading(false);
    }
  };

  const filteredOrders = orders.filter(o => {
    if (filter === "All") return true;
    return o.status.toLowerCase() === filter.toLowerCase();
  });

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen p-1">
      {showMessage ? (
        <p className="text-3xl font-bold text-center">{displayedText}</p>
      ) : (
        <>
          <div className="w-4/5 mx-auto p-6">
            <div className="flex justify-between items-center mb-6 text-xs">
              <button className="text-gray-700 hover:text-gray-900">&larr; BACK TO PROFILE</button>
              <span className="font-semibold">PROFILE / ORDERS</span>
            </div>
            <h1 className="text-3xl font-bold text-center mb-8">Your Orders</h1>
            <div className="flex justify-evenly mb-10">
              {(["All","Shipping","Delivered","Cancelled","Returned"] as Tab[]).map(tab => (
                <button
                  key={tab}
                  className={`relative w-1/5 text-center ${filter === tab ? "text-black font-semibold" : "text-gray-400"}`}
                  onClick={() => setFilter(tab)}
                >
                  {tab}
                  {filter === tab && <span className="absolute left-1/2 -translate-x-1/2 mt-4 text-3xl">•</span>}
                </button>
              ))}
            </div>
            {filteredOrders.length === 0 ? (
              <p className="text-center text-gray-500">No purchase history found.</p>
            ) : (
              filteredOrders.map(order => (
                <div key={order.id} className="border border-gray-300 p-6 mb-8 rounded-lg shadow bg-white">
                  <div className="flex justify-between items-center text-sm mb-4">
                    <span className="font-semibold">Order Status:</span>
                    <span className="tracking-wide">{order.status}</span>
                  </div>
                  <div className="flex gap-4">
                    {order.orderItems?.[0] && (
                      <img
                        src={order.orderItems[0].product.imageUrl}
                        alt={order.orderItems[0].product.name}
                        className="w-24 h-36 object-cover rounded"
                      />
                    )}
                    <div className="space-y-1">
                      <p>Order No: #{order.id}</p>
                      <p>Order Date: {order.dateTime}</p>
                      <p>Items Total: {order.orderItems?.length ?? "-"}</p>
                      <p className="font-semibold mt-1">Total Price: ${order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="border-t mt-6 pt-6 flex gap-4">
                    <button
                      className="px-6 py-2 border border-gray-300 hover:bg-gray-100"
                      onClick={() => console.log("Cancel", order.id)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-8 py-2 text-white bg-black hover:bg-black/70"
                      onClick={() => handleView(order)}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {selectedOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="relative bg-white w-[90%] md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto p-8 rounded-xl shadow-2xl">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="absolute top-4 right-4 text-xl text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
                <h2 className="text-2xl font-bold mb-4">
                  Order #{selectedOrder.id}
                  <span className="ml-3 text-base font-normal text-gray-500">({selectedOrder.status})</span>
                </h2>
                {viewLoading && <p className="mb-6">Loading…</p>}
                {viewError && <p className="mb-6 text-red-500">{viewError}</p>}
                {!viewLoading && !viewError && selectedOrder.orderItems.map(item => (
                  <div key={item.id} className="flex gap-4 mb-6">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-24 h-36 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                      <p className="text-sm mt-1">Unit Price: ${item.unitPriceAtTransaction.toFixed(2)}</p>
                      <p className="font-medium mt-2">Subtotal: ${(item.unitPriceAtTransaction * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                {!viewLoading && !viewError && (
                  <div className="border-t pt-4 text-right">
                    <span className="font-bold text-lg">Order Total:</span>
                    <span className="font-bold text-lg">${selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PurchaseHistory;
