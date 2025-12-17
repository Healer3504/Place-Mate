import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/Dashboard";
import Applications from "../pages/Applications";
import Preparation from "../pages/Preparation";
import Timeline from "../pages/Timeline";
import Achievements from "../pages/Achievements";
import Resources from "../pages/Resources";

const MainLayout = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;

      case "applications":
        return <Applications />;

      case "preparation":
        return <Preparation />;

      case "timeline":
        return <Timeline />;

      case "achievements":
        return <Achievements />;

      case "resources":
        return <Resources />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      <Sidebar active={activeView} setActive={setActiveView} />

      <main className="ml-64 p-6 w-full">
        {renderContent()}
      </main>
    </div>
  );
};

export default MainLayout;
