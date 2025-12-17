import React from "react";
import theme from "../theme";

const SkillProgress = ({ skill, progress }) => {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium" style={{ color: theme.mocha }}>
          {skill}
        </span>
        <span className="font-bold" style={{ color: theme.accent.caramel }}>
          {progress}%
        </span>
      </div>

      <div
        className="h-3 rounded-full overflow-hidden"
        style={{ background: theme.foam }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${theme.accent.caramel} 0%, ${theme.accent.cinnamon} 100%)`,
          }}
        />
      </div>
    </div>
  );
};

export default SkillProgress;
