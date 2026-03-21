"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.scss";
import { ADMIN_TABS } from "./types";
import { adminLogin } from "./utils/api";
import ProductsTab from "./components/ProductsTab";
import ProjectsTab from "./components/ProjectsTab";
import ServicesTab from "./components/ServicesTab";
import FabricationTab from "./components/FabricationTab";
import ClientsTab from "./components/ClientsTab";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // const token = sessionStorage.getItem("admin_token");
    // if (token) setIsAuthenticated(true);
    setIsAuthenticated(true)
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);

    const result = await adminLogin(username, password);

    if (result.success && result.token) {
      sessionStorage.setItem("admin_token", result.token);
      setIsAuthenticated(true);
    } else {
      setLoginError(result.error || "Invalid credentials");
    }

    setLoggingIn(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  const renderTab = () => {
    switch (activeTab) {
      case "products":
        return <ProductsTab />;
      case "projects":
        return <ProjectsTab />;
      case "services":
        return <ServicesTab />;
      case "fabrication":
        return <FabricationTab />;
      case "clients":
        return <ClientsTab />;
      default:
        return <ProductsTab />;
    }
  };

  // ─── Login Screen ──────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <div className={styles.loginLogo}>
              <svg viewBox="0 0 48 48" fill="currentColor">
                <path d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" />
              </svg>
            </div>
            <h1>Admin Panel</h1>
            <p>Elite Facade Solutions CMS</p>
          </div>

          <form className={styles.loginForm} onSubmit={handleLogin}>
            {loginError && (
              <div className={styles.loginError}>
                <span className="material-symbols-outlined">error</span>
                {loginError}
              </div>
            )}

            <div className={styles.inputGroup}>
              <span className="material-symbols-outlined">person</span>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <span className="material-symbols-outlined">lock</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.loginBtn}
              disabled={loggingIn}
            >
              {loggingIn ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Dashboard ─────────────────────────────────────────────
  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <div className={styles.sidebarHeader}>
          {sidebarOpen && (
            <div className={styles.sidebarBrand}>
              <h2>Elite Facade</h2>
              <span>Admin CMS</span>
            </div>
          )}
        </div>

        <nav className={styles.sidebarNav}>
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.sidebarLink} ${activeTab === tab.id ? styles.sidebarLinkActive : ""}`}
              onClick={() => setActiveTab(tab.id)}
              title={tab.label}
            >
              <span className="material-symbols-outlined">{tab.icon}</span>
              {sidebarOpen && <span>{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout} title="Logout">
            <span className="material-symbols-outlined">logout</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className={styles.mainArea}>
        {/* Top Bar */}
        <header className={styles.topBar}>
          <button
            className={styles.menuToggle}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="material-symbols-outlined">
              {sidebarOpen ? "menu_open" : "menu"}
            </span>
          </button>

          <div className={styles.topBarRight}>
            <div className={styles.adminUser}>
              <span className="material-symbols-outlined">admin_panel_settings</span>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.pageContent}>
          {renderTab()}
        </main>
      </div>
    </div>
  );
}