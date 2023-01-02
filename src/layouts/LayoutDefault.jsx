import SideBar from 'src/components/common/SideBar';
import './layout.css';
const Layout = ({ children }) => {
  return (
    <div id="container">
      <SideBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
