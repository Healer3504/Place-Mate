import React from "react";
import theme from "../theme";
import { BookOpen, Code, Cpu, Layers, ExternalLink, PlayCircle } from "lucide-react";

const Resources = () => {

  const resources = [
    {
      title: "DSA Roadmap",
      desc: "Complete roadmap from basics → advanced with best playlists.",
      icon: Layers,
      link: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",
      color: theme.accent.caramel,
    },
    {
      title: "Web Development Roadmap",
      desc: "Frontend + Backend full learning journey.",
      icon: Code,
      link: "https://www.youtube.com/@codewithharry",
      color: theme.accent.cinnamon,
    },
    {
      title: "CS Fundamentals",
      desc: "OS, DBMS, CN & OOP interview notes.",
      icon: BookOpen,
      link: "https://www.javatpoint.com/dbms-tutorial",
      color: theme.latte,
    },
    {
      title: "Machine Learning Starter Kit",
      desc: "ML basics + intuitive explanation playlists.",
      icon: Cpu,
      link: "https://www.youtube.com/@statquest",
      color: theme.accent.hazelnut,
    },
    {
      title: "Aptitude Practice",
      desc: "Quantitative aptitude + logical reasoning tests.",
      icon: PlayCircle,
      link: "https://indiabix.com",
      color: theme.mocha,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4" style={{ color: theme.espresso }}>
        Resources 📚
      </h1>

      <p className="text-md mb-6" style={{ color: theme.mocha }}>
        Your complete toolkit for cracking placements — curated to save your time.
      </p>

      <div className="grid grid-cols-2 gap-6">
        {resources.map((res, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer"
            style={{
              background: `linear-gradient(135deg, white, ${theme.milk})`,
              border: `1px solid ${theme.cream}`,
            }}
            onClick={() => window.open(res.link, "_blank")}
          >
            <div className="flex items-center gap-3 mb-3">
              <res.icon
                className="w-10 h-10"
                style={{ color: res.color }}
              />
              <h2
                className="text-xl font-bold"
                style={{ color: theme.espresso }}
              >
                {res.title}
              </h2>
            </div>

            <p className="text-sm mb-3" style={{ color: theme.mocha }}>
              {res.desc}
            </p>

            <div className="flex items-center gap-2" style={{ color: res.color }}>
              <ExternalLink className="w-4 h-4" />
              <span className="font-semibold text-sm">Open Resource</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
