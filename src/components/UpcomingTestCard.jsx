import React from "react";

const UpcomingTestCard = ({ test, theme }) => {
  return (
    <div
      className="p-4 rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer"
      style={{
        background: `${test.color}15`,
        border: `1px solid ${test.color}30`,
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-bold text-lg" style={{ color: theme.espresso }}>
            {test.company}
          </h4>
          <p className="text-sm" style={{ color: theme.mocha }}>
            {test.role}
          </p>
        </div>

        <div>
          <div
            className="px-3 py-1 rounded-full font-semibold text-sm"
            style={{ background: test.color, color: "white" }}
          >
            {test.date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTestCard;
