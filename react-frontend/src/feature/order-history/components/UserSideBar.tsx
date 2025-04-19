import { NavLink } from "react-router-dom";

export const UserSideBar = () => {
    const menuItems = [
        { label: "Profile", path: "/account/" },
        { label: "Orders", path: "/account/orders" },
    ];

    return (
        <div className="w-1/4 bg-gray-0 p-6">
            <h2 className="font-bold text-xl mb-6">MENU</h2>
            <div className="space-y-4">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `w-full text-left text-[11px] flex items-center ${isActive ? "text-black text-[13px]" : "text-gray-500"
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && <span className="mr-2">•</span>}
                                {item.label}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};
