import { Order } from "../../../types/Order";
import { formatDate } from "../../../utils/formatDate";

interface OrderCardsProps {
    order: Order;
    onCancel: (id: number) => void;
    onView: (id: number) => void;
};

const OrderCard = ({ order, onCancel, onView }: OrderCardsProps) => {
    const imageUrl = order.orderItems[0]?.product.imageUrl || "/placeholder.jpg";
    const imageAlt = order.orderItems[0]?.product.name || "Product";

    return (
        <div className="border p-6 my-4 rounded-lg shadow-lg bg-white border-gray-300">
            <div className="flex justify-between items-center">
                <div className="text-gray-700 font-bold text-[11px]">Order Status:</div>
                <div className="text-gray-700 text-[14px]">{order.status}</div>
            </div>

            <div className="flex space-x-4 mt-4">
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-32 h-48 object-cover"
                />

                <div className="space-y-2 ml-4">
                    <p className="text-gray-600">Order No: #{order.id}</p>
                    <p className="text-gray-600">Order Date: {formatDate(order.dateTime)}</p>
                    <p className="text-gray-600">Books Total: {order.orderItems.length}</p>
                    <p className="text-gray-800 text-[18px]">Total Price: ${order.totalAmount}</p>
                </div>
            </div>

            <div className="border-t-2 my-4 border-gray-400"></div>
            <div className="flex space-x-4 mt-4">
                <button
                    onClick={() => onCancel(order.id)}
                    className="text-black border border-black/10 px-6 py-2 bg-white cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                >
                    Cancel
                </button>

                <button
                    onClick={() => onView(order.id)}
                    className="text-white border border-transparent px-8 py-2 bg-black cursor-pointer hover:bg-black/70 transition-colors duration-300"
                >
                    View
                </button>
            </div>
        </div>
    );
};

export default OrderCard;