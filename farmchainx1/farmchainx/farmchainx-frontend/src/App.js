import React, { useState } from "react";
import "./App.css";

// Tabs
import DashboardTab from "./components/DashboardTab";
import FarmersTab from "./components/FarmersTab";
import CropsTab from "./components/CropsTab";
import BatchesTab from "./components/BatchesTab";
import TraceTab from "./components/TraceTab";
import DistributorTab from "./components/DistributorTab";
import ConsumerTab from "./components/ConsumerTab";
import AdminTab from "./components/AdminTab";

// ✅ AI Chatbot
import ChatbotWidget from "./components/chatbot/ChatbotWidget";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoggedIn] = useState(true); // keep simple for now

  const renderTab = () => {
    switch (activeTab) {
      case "farmers":
        return <FarmersTab />;
      case "crops":
        return <CropsTab />;
      case "batches":
        return <BatchesTab />;
      case "trace":
        return <TraceTab />;
      case "distributor":
        return <DistributorTab />;
      case "consumer":
        return <ConsumerTab />;
      case "admin":
        return <AdminTab />;
      default:
        return <DashboardTab />;
    }
  };

  if (!isLoggedIn) {
    return <div>Please login</div>;
  }

  return (
    <div className="app-container">
      {/* Top Bar */}
      <header className="top-bar">
        <h2>FarmChainX</h2>
      </header>

      {/* Bottom Navigation */}
      <div className="tab-nav">
        <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveTab("farmers")}>Farmers</button>
        <button onClick={() => setActiveTab("crops")}>Crops</button>
        <button onClick={() => setActiveTab("batches")}>Batches</button>
        <button onClick={() => setActiveTab("trace")}>Trace</button>
        <button onClick={() => setActiveTab("distributor")}>Distributor</button>
        <button onClick={() => setActiveTab("consumer")}>Consumer</button>
        <button onClick={() => setActiveTab("admin")}>Admin</button>
      </div>


      {/* Main Content */}
      <div className="content">
        {renderTab()}
      </div>

      

      {/* ✅ Floating AI Chatbot (bottom-right) */}
      <ChatbotWidget />
    </div>
  );
}

export default App;
