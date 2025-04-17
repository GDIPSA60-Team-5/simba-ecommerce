import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const AdminLayout = () => {
    return (
        <div>
            <header>
                <NavBar></NavBar>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
            </footer>
        </div>
    );
}
export default AdminLayout;