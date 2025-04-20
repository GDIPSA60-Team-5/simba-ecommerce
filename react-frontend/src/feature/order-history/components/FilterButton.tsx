import { OrderStatus } from "../../../types/OrderStatus";

interface FilterButtonProps {
    label: string;
    status: OrderStatus;
    activeStatus: string;
    onClick: (status: OrderStatus) => void;
}

const FilterButton = ({ label, status, activeStatus, onClick }: FilterButtonProps) => {
    const isActive = activeStatus === status;

    return (
        <button
            onClick={() => onClick(status)}
            className={`w-1/5 text-center relative cursor-pointer transition-colors duration-300 text-2xl ${isActive ? "text-black" : "text-gray-300"
                } rounded-[7px]`}
        >
            {label}
            <span
                className={`absolute left-1/2 transform -translate-x-1/2 text-4xl transition-all duration-300 ${isActive
                    ? "opacity-100 translate-y-5"
                    : "opacity-0 translate-y-0 pointer-events-none"
                    }`}
            >
                •
            </span>
        </button>
    );
};

export default FilterButton;
