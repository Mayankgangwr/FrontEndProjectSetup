import Styles from "./Layout.module.scss";
import DesktopHeader from "./DesktopLayout/DesktopHeader";
import MobileHeader from "./MobileLayout/MobileHeader";
import Sidebar from "./DesktopLayout/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <div className={Styles.MobileLayout}>
                <MobileHeader />
                <Outlet />
            </div>

            <div className={Styles.DesktopLayout}>
                <div className={Styles.Sidebar}>
                    <Sidebar />
                </div>
                <div className={Styles.DesktopHeader}>
                    <DesktopHeader />
                    <div className="mt-[76px]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Layout;
