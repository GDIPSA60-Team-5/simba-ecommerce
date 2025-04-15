import NavBar from "../components/NavBar";
import { Outlet } from 'react-router-dom';

const Layout = () => {
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
};

export default Layout;