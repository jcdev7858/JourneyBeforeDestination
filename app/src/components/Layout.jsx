import { useAppData } from "../context/AppDataContext";
import Flex from "./ui/Flex";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  const { user } = useAppData();
  return (
    <Flex className={styles.shell} vertical data-order={user.orderId}>
      <Header />
      <Outlet />
      <Footer />
    </Flex>
  );
}
