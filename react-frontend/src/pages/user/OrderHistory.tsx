import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useUserOrders } from "../../feature/order-history/hooks/useUserOrders";
import { OrderStatus } from "../../types/OrderStatus";
import FilterButton from "../../feature/order-history/components/FilterButton";
import OrderCard from "../../feature/order-history/components/OrderCard";
import { UserHeader } from "../../feature/order-history/components/UserHeader";
import { Order } from "../../types/Order";

const OrderHistory = () => {
  const { user } = useAuth();
  const { orders, loading, error } = useUserOrders(user?.id);
  const [filter, setFilter] = useState<OrderStatus>(OrderStatus.All);
  const [activeButton, setActiveButton] = useState<OrderStatus>(OrderStatus.All);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [viewError, setViewError] = useState<string | null>(null);

  const filterOrders = (status: OrderStatus) => {
    setFilter(status);
    setActiveButton(status);
  };

  const filteredOrders =
    filter === OrderStatus.All ? orders : orders.filter((o) => o.status === filter);

  const handleCancel = (orderNumber: number) => {
    console.log(`Cancel order #${orderNumber}`);
  };

  const handleView = async (orderNumber: number) => {
    setViewLoading(true);
    setViewError(null);
    try {
      const { data } = await axios.get<Order>(`/api/orders/${orderNumber}`);
      setSelectedOrder(data);
    } catch {
      setViewError("Failed to load order details");
    } finally {
      setViewLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-3/4 p-6">
      <UserHeader />

      <div className="flex justify-center mb-6">
        <h2 className="text-[30px] text-gray-800 font-semibold">Your Orders</h2>
      </div>

      <div className="flex justify-evenly w-full mb-15">
        {Object.values(OrderStatus).map((status) => (
          <FilterButton
            key={status}
            label={status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
            status={status}
            activeStatus={activeButton}
            onClick={filterOrders}
          />
        ))}
      </div>

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onCancel={handleCancel}
            onView={() => handleView(order.id)}
          />
        ))
      ) : (
        <div className="h-70">
          <p className="text-center text-2xl">No orders here yet.</p>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative bg-white w-[90%] md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto p-8 rounded-xl shadow-2xl">
            <button
              className="absolute top-4 right-4 text-xl text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Order #{selectedOrder.id}
              <span className="ml-4 text-base font-normal text-gray-500">
                ({selectedOrder.status})
              </span>
            </h2>

            {viewLoading && <p>Loading...</p>}
            {viewError && <p className="text-red-500">{viewError}</p>}

            {!viewLoading &&
              !viewError &&
              selectedOrder.orderItems.map((item) => (
                <div key={item.id} className="flex gap-4 mb-6">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-24 h-36 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                    <p className="text-sm mt-1">
                      Unit Price: ${item.unitPriceAtTransaction.toFixed(2)}
                    </p>
                    <p className="font-medium mt-2">
                      Subtotal: ${(item.unitPriceAtTransaction * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

            <div className="border-t pt-4 text-right">
              <span className="font-bold text-lg">Order Total: </span>
              <span className="font-bold text-lg">${selectedOrder.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
