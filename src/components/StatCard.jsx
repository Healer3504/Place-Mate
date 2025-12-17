import React from "react";

const StatCard = ({ icon: Icon, label, value, change, color }) => {
  return (
    <div
      className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
      style={{
        background: "linear-gradient(135deg, white 0%, #EFEBE9 100%)",
        border: "1px solid #D7CCC8",
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className="p-3 rounded-xl"
          style={{ background: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>

        <span
          className="text-xs font-semibold px-2 py-1 rounded-full"
          style={{ background: `${color}20`, color }}
        >
          {change}
        </span>
      </div>

      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className="text-sm text-gray-700">{label}</p>
    </div>
  );
};

export default StatCard;
