import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ children, title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      <div className="dashboard-main">
        <Topbar title={title} subtitle={subtitle} onMenuClick={openSidebar} />

        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;