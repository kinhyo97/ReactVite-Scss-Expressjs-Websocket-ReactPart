import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MainLayout.scss";

function MainLayout({ children }) {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
