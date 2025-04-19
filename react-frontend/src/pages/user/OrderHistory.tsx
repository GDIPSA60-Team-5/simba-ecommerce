import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useUserOrders } from "../../feature/order-history/hooks/useUserOrders";
import { OrderStatus } from "../../types/OrderStatus";
import FilterButton from "../../feature/order-history/components/FilterButton";
import OrderCard from "../../feature/order-history/components/OrderCard";
import { UserHeader } from "../../feature/order-history/components/UserHeader";

const OrderHistory = () => {
  const { user } = useAuth();
  const { orders, loading, error } = useUserOrders(user?.id);
  const [filter, setFilter] = useState<OrderStatus>(OrderStatus.All);
  const [activeButton, setActiveButton] = useState<OrderStatus>(OrderStatus.All);

  const filterOrders = (status: OrderStatus) => {
    setFilter(status);
    setActiveButton(status);
  };

  const filteredOrders = filter === OrderStatus.All
    ? orders
    : orders.filter((order) => order.status === filter);

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
            onView={handleView}
          />
        ))
      ) : (
        <div className="h-70">
          <p className="text-center text-2xl">No orders here yet.</p>
        </div>
      )}
    </div>
  );
};

const handleCancel = (orderNumber: number) => {
  console.log(`Cancel order #${orderNumber}`);
};

const handleView = (orderNumber: number) => {
  console.log(`View order #${orderNumber}`);
};

export default OrderHistory;
