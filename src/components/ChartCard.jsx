import React from "react";
import theme from "../theme";

const ChartCard = ({ title, children }) => {
  return (
    <div
      className="p-6 rounded-2xl shadow-lg backdrop-blur-sm"
      style={{
        background: "linear-gradient(135deg, white 0%, #EFEBE9 100%)",
        border: `1px solid ${theme.cream}`,
      }}
    >
      <h3 className="text-xl font-bold mb-4" style={{ color: theme.espresso }}>
        {title}
      </h3>

      {children}
    </div>
  );
};

export default ChartCard;
