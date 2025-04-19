import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Outlet } from 'react-router-dom';
import { UserSideBar } from "../feature/order-history/components/UserSideBar";

const UserLayout = () => {
    return (
        <div>
            <header>
                <NavBar></NavBar>
            </header>
            <main>
                <div className="flex w-[80%] mx-auto">
                    <UserSideBar />
                    <Outlet />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div >
    );
};

export default UserLayout;