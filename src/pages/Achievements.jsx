import React from "react";
import theme from "../theme";
import {  Flame, Briefcase, BookOpen, Star } from "lucide-react";

const Achievements = () => {
  // Mock user stats (later we connect backend)
  const stats = {
    applications: 42,
    studyHours: 120,
    streak: 18,
    skillsMastered: 4,
  };

  const badges = [
    {
      title: "Application Beginner",
      description: "Applied to 10 companies",
      icon: Briefcase,
      earned: stats.applications >= 10,
      color: theme.accent.caramel,
    },
    {
      title: "Application Pro",
      description: "Applied to 30+ companies",
      icon: Briefcase,
      earned: stats.applications >= 30,
      color: theme.accent.cinnamon,
    },
    {
      title: "Study Warrior",
      description: "Completed 50 hours of prep",
      icon: BookOpen,
      earned: stats.studyHours >= 50,
      color: theme.latte,
    },
    {
      title: "Consistency King",
      description: "7-day Study Streak",
      icon: Flame,
      earned: stats.streak >= 7,
      color: theme.accent.hazelnut,
    },
    {
      title: "Skill Builder",
      description: "Mastered 3 Skills",
      icon: Star,
      earned: stats.skillsMastered >= 3,
      color: theme.mocha,
    },
  ];

  // Circular progress helper
  const ProgressCircle = ({ progress, color }) => {
    const size = 120;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <svg width={size} height={size} className="mx-auto">
        <circle
          stroke={theme.foam}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
    );
  };

  return (
    <div className="p-6">
      <h1
        className="text-4xl font-bold mb-4"
        style={{ color: theme.espresso }}
      >
        Achievements 🏆
      </h1>

      <p className="mb-6 text-md" style={{ color: theme.mocha }}>
        Celebrate your placement journey progress!
      </p>

      {/* TOP 3 STATS WITH PROGRESS RINGS */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        {/* Applications */}
        <div
          className="p-6 rounded-xl shadow-lg text-center"
          style={{
            background: `linear-gradient(135deg, white, ${theme.milk})`,
            border: `1px solid ${theme.cream}`,
          }}
        >
          <ProgressCircle progress={(stats.applications / 50) * 100} color={theme.accent.caramel} />
          <h3 className="mt-4 text-xl font-semibold" style={{ color: theme.espresso }}>
            {stats.applications} Applications
          </h3>
        </div>

        {/* Study Hours */}
        <div
          className="p-6 rounded-xl shadow-lg text-center"
          style={{
            background: `linear-gradient(135deg, white, ${theme.milk})`,
            border: `1px solid ${theme.cream}`,
          }}
        >
          <ProgressCircle progress={(stats.studyHours / 200) * 100} color={theme.accent.cinnamon} />
          <h3 className="mt-4 text-xl font-semibold" style={{ color: theme.espresso }}>
            {stats.studyHours} Study Hours
          </h3>
        </div>

        {/* Streak */}
        <div
          className="p-6 rounded-xl shadow-lg text-center"
          style={{
            background: `linear-gradient(135deg, white, ${theme.milk})`,
            border: `1px solid ${theme.cream}`,
          }}
        >
          <ProgressCircle progress={(stats.streak / 30) * 100} color={theme.accent.hazelnut} />
          <h3 className="mt-4 text-xl font-semibold" style={{ color: theme.espresso }}>
            {stats.streak}-Day Streak 🔥
          </h3>
        </div>
      </div>

      {/* BADGES SECTION */}
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: theme.espresso }}
      >
        Badges Earned 🎖️
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="p-5 rounded-xl shadow-lg transition-all hover:scale-105 cursor-pointer"
            style={{
              background: badge.earned ? `${badge.color}20` : `${theme.foam}`,
              border: `1px solid ${badge.color}40`,
            }}
          >
            <badge.icon
              className="w-10 h-10 mb-3"
              style={{ color: badge.earned ? badge.color : theme.mocha }}
            />
            <h3
              className="font-bold text-lg"
              style={{ color: theme.espresso }}
            >
              {badge.title}
            </h3>
            <p
              className="text-sm mt-1"
              style={{ color: theme.mocha }}
            >
              {badge.description}
            </p>

            {!badge.earned && (
              <p
                className="text-xs mt-2 italic"
                style={{ color: theme.accent.cinnamon }}
              >
                Keep going to unlock this badge!
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
