import React from "react";
import theme from "../theme";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  BarChart3,
  Briefcase,
  Target,
  Calendar,
  BookOpen,
  Award,
  Coffee,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth(); 

  const menuItems = [
    { label: "Dashboard", icon: BarChart3, path: "/" },
    { label: "Applications", icon: Briefcase, path: "/applications" },
    { label: "Preparation", icon: Target, path: "/preparation" },
    { label: "Timeline", icon: Calendar, path: "/timeline" },
    { label: "Resources", icon: BookOpen, path: "/resources" },
    { label: "Achievements", icon: Award, path: "/achievements" },
  ];

  return (
    <div
      className="fixed left-0 top-0 h-full w-64 p-6 backdrop-blur-xl shadow-xl"
      style={{
        background: `linear-gradient(180deg, ${theme.espresso}f0 0%, ${theme.darkRoast}f0 100%)`,
        borderRight: `1px solid ${theme.mocha}40`,
      }}
    >
      {/* Logo Section */}
      <div className="mb-10 flex items-center gap-3">
        <Coffee className="w-8 h-8" style={{ color: theme.accent.caramel }} />
        <h1 className="text-2xl font-bold text-white">PlaceMate</h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        {menuItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group"
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${theme.accent.caramel}, ${theme.accent.cinnamon})`
                  : "transparent",
                color: isActive ? theme.espresso : theme.cream,
              }}
            >
              <item.icon
                className="w-5 h-5 transition-transform group-hover:scale-110"
                style={{ color: isActive ? theme.espresso : theme.cream }}
              />
              <span className="font-medium text-md">{item.label}</span>
            </button>
          );
        })}
      </nav>
        {/* LOGOUT BUTTON */}
<button
  onClick={logout}
  className="mt-6 w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
  style={{
    background: `${theme.mocha}40`,
    color: theme.cream,
  }}
>
  <LogOut className="w-5 h-5" />
  <span className="font-medium">Logout</span>
</button>

      {/* Daily Streak */}
      <div
        className="absolute bottom-6 left-6 right-6 p-4 rounded-xl"
        style={{
          background: `${theme.mocha}50`,
          backdropFilter: "blur(10px)",
        }}
      >
        <p className="text-xs text-white/70 mb-1">Daily Streak</p>
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <span className="text-xl font-bold text-white">15 Days</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
