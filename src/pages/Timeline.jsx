import React from "react";
import theme from "../theme";
import { Calendar, Clock, Briefcase, ArrowRight } from "lucide-react";

const Timeline = () => {
  const events = [
    {
      title: "Google Interview",
      date: "Mon, 10 Feb",
      time: "10:00 AM",
      type: "Interview",
      icon: Briefcase,
    },
    {
      title: "Resume Review",
      date: "Tue, 11 Feb",
      time: "02:00 PM",
      type: "Review Session",
      icon: Calendar,
    },
    {
      title: "DSA Mock Test",
      date: "Thu, 13 Feb",
      time: "06:00 PM",
      type: "Practice Test",
      icon: Clock,
    },
  ];

  return (
    <div className="p-4">
      {/* Page Title */}
      <h1
        className="text-4xl font-bold mb-4"
        style={{ color: theme.espresso }}
      >
        Timeline 🗓️
      </h1>

      <p className="text-md mb-6" style={{ color: theme.mocha }}>
        Track your upcoming interviews, tests, reviews and preparation sessions.
      </p>

      {/* Timeline Box */}
      <div
        className="rounded-2xl p-6 shadow-md mb-6"
        style={{
          background: theme.cream,
          border: `1px solid ${theme.foam}`,
        }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: theme.espresso }}
        >
          Upcoming Events
        </h2>

        <div className="space-y-6">
          {events.map((event, idx) => (
            <div key={idx} className="flex items-start gap-4">
              {/* Icon */}
              <div
                className="p-3 rounded-xl"
                style={{
                  background: theme.foam,
                  border: `1px solid ${theme.milk}`,
                }}
              >
                <event.icon
                  className="w-6 h-6"
                  style={{ color: theme.accent.caramel }}
                />
              </div>

              {/* Event Details */}
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: theme.espresso }}
                >
                  {event.title}
                </h3>

                <div className="flex items-center gap-2 text-sm mt-1">
                  <Calendar className="w-4 h-4" />
                  <span style={{ color: theme.mocha }}>{event.date}</span>
                </div>

                <div className="flex items-center gap-2 text-sm mt-1">
                  <Clock className="w-4 h-4" />
                  <span style={{ color: theme.mocha }}>{event.time}</span>
                </div>

                <p
                  className="text-sm mt-2"
                  style={{ color: theme.accent.cinnamon }}
                >
                  {event.type}
                </p>
              </div>

              <ArrowRight
                className="w-5 h-5 mt-2"
                style={{ color: theme.mocha }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Progress */}
      <div
        className="rounded-2xl p-6 shadow-md"
        style={{
          background: theme.cream,
          border: `1px solid ${theme.foam}`,
        }}
      >
        <h2
          className="text-xl font-semibold mb-4"
          style={{ color: theme.espresso }}
        >
          Weekly Preparation Progress
        </h2>

        <div className="space-y-4">
          {[
            { label: "DSA", value: 70 },
            { label: "System Design", value: 45 },
            { label: "Projects", value: 85 },
            { label: "Coding Practice", value: 60 },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span className="font-medium" style={{ color: theme.mocha }}>
                  {item.label}
                </span>
                <span style={{ color: theme.mocha }}>{item.value}%</span>
              </div>

              <div className="w-full h-3 rounded-xl bg-gray-200">
                <div
                  className="h-3 rounded-xl"
                  style={{
                    width: `${item.value}%`,
                    background: `linear-gradient(135deg, ${theme.accent.caramel}, ${theme.accent.cinnamon})`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
