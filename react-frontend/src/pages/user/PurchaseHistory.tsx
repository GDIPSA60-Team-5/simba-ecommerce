import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Order } from "../../types/Order";

const PurchaseHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('All');
  const [activeButton, setActiveButton] = useState('All');



  useEffect(() => {
    if (!user) return;

    setLoading(true);
    setError(null);

    axios.get(`/api/orders/user/${user.id}`)
      .then((response) => {
        setOrders(response.data)
      }).catch((error) => {
        setError("Failed to fetch orders");
        console.error(error);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  const filterOrders = (status: string) => {
    setFilter(status);
    setActiveButton(status);
  };


  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.status === filter);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (

    <div className="w-3/4 p-6">
      <div className="flex justify-between items-center mb-6">
        <button className="text-[11px] text-gray-700 hover:text-gray-900">← BACK TO PROFILE</button>
        <h1 className="text-[11px] text-gray-800 font-semibold">PROFILE / ORDERS</h1>
      </div>

      <>
        <div className="flex justify-center mb-6">
          <h2 className="text-[30px] text-gray-800 font-bold">Your Orders</h2>
        </div>

        <div className="flex justify-evenly w-full mb-6">
          <button
            onClick={() => filterOrders('All')}
            className={`w-1/5 text-center relative ${activeButton === 'All' ? 'text-black text-[13px]' : 'text-gray-300'} rounded-[7px]`}
          >
            All
            {activeButton === 'All' && <span className="absolute mt-4 left-1/2 transform -translate-x-1/2 text-3xl">•</span>}
          </button>
          <button
            onClick={() => filterOrders('Shipping')}
            className={`w-1/5 text-center relative ${activeButton === 'Shipped' ? 'text-black text-[13px]' : 'text-gray-300'} rounded-[7px]`}
          >
            Shipping
            {activeButton === 'Shipped' && <span className="absolute mt-4 left-1/2 transform -translate-x-1/2 text-3xl">•</span>}
          </button>
          <button
            onClick={() => filterOrders('Delivered')}
            className={`w-1/5 text-center relative ${activeButton === 'Delivered' ? 'text-black text-[13px]' : 'text-gray-300'} rounded-[7px]`}
          >
            Delivered
            {activeButton === 'Delivered' && <span className="absolute mt-4 left-1/2 transform -translate-x-1/2 text-3xl">•</span>}
          </button>
          <button
            onClick={() => filterOrders('Cancelled')}
            className={`w-1/5 text-center relative ${activeButton === 'Cancelled' ? 'text-black text-[13px]' : 'text-gray-300'} rounded-[7px]`}
          >
            Cancelled
            {activeButton === 'Cancelled' && <span className="absolute mt-4 left-1/2 transform -translate-x-1/2 text-3xl">•</span>}
          </button>
          <button
            onClick={() => filterOrders('Returned')}
            className={`w-1/5 text-center relative ${activeButton === 'Returned' ? 'text-black text-[13px]' : 'text-gray-300'} rounded-[7px]`}
          >
            Returned
            {activeButton === 'Returned' && <span className="absolute mt-4 left-1/2 transform -translate-x-1/2 text-3xl">•</span>}
          </button>
        </div>

        {
          filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <div key={index} className="border p-6 my-4 rounded-lg shadow-lg bg-white border-gray-300">
                <div className="flex justify-between items-center">
                  <div className="text-gray-700 font-bold text-[11px]">Order Status:</div>
                  <div className="text-gray-700 text-[14px]">{order.status}</div>
                </div>

                <div className="flex space-x-4 mt-4">
                  <img
                    src={order.orderItems[1].product.imageUrl}
                    alt={order.orderItems[1].product.name}
                    className="w-32 h-48 object-cover"
                  />

                  <div className="space-y-2 ml-4">
                    <p className="text-gray-600">Order No: #{order.id}</p>
                    <p className="text-gray-600">Order Date: {order.dateTime}</p>
                    <p className="text-gray-600">Books Total: {order.orderItems.length}</p>
                    <p className="text-gray-800 text-[18px]">Total Price: ${order.totalAmount}</p>
                  </div>
                </div>

                <div className="border-t-2 my-4 border-gray-400"></div>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleCancel(order.id)}
                    className=" text-black border border-black/10 px-6 py-2  bg-white hover:bg-gray-100 transition-color duration-300 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => handleView(order.id)}
                    className=" text-white border border-transparent px-8 py-2  bg-black hover:bg-black/70 transition-color duration-300 cursor-pointer"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No purchase history found.</p>
          )}
      </>
    </div>
  );
};

const handleCancel = (orderNumber: number) => {
  console.log(`Cancel order #${orderNumber}`);
};

const handleView = (orderNumber: number) => {
  console.log(`View order #${orderNumber}`);
};

export default PurchaseHistory;
