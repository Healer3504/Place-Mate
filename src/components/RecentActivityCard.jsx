import React from "react";

const RecentActivityCard = ({ app, theme }) => {
  return (
    <div
      className="p-4 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer"
      style={{
        background: `${app.color}10`,
        border: `1px solid ${app.color}20`,
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold" style={{ color: theme.espresso }}>
            {app.company}
          </h4>
          <p className="text-sm" style={{ color: theme.mocha }}>
            {app.role}
          </p>
        </div>

        <div className="text-right">
          <div
            className="px-2 py-1 rounded-lg text-xs font-semibold mb-1"
            style={{ background: app.color, color: "white" }}
          >
            {app.status}
          </div>

          <p className="text-xs" style={{ color: theme.mocha }}>
            {app.date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecentActivityCard;
