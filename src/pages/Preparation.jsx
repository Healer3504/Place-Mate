import React, { useState, useEffect } from "react";
import theme from "../theme";
import { CheckCircle, Clock, Target, Plus, Trash2 } from "lucide-react";

const Preparation = () => {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("prep-tasks")) || [];
  });

  const [newTask, setNewTask] = useState("");

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("prep-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Timer State
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Pomodoro Timer Logic
  useEffect(() => {
    let timer = null;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((sec) => sec + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      label: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Convert seconds → mm:ss format
  const formatTime = () => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="p-6">
      <h1
        className="text-4xl font-bold mb-4"
        style={{ color: theme.espresso }}
      >
        Preparation Planner 🎯
      </h1>

      <p className="text-md mb-6" style={{ color: theme.mocha }}>
        Track your tasks, progress & daily learning schedule.
      </p>

      {/* 🟫 GRID WRAPPER */}
      <div className="grid grid-cols-2 gap-6">

        {/* ======================= TASK MANAGER ======================= */}
        <div
          className="p-6 rounded-xl shadow-lg"
          style={{
            background: `linear-gradient(135deg, white, ${theme.milk})`,
            border: `1px solid ${theme.cream}`,
          }}
        >
          <h2
            className="text-2xl font-bold mb-4 flex items-center gap-2"
            style={{ color: theme.espresso }}
          >
            <Target style={{ color: theme.accent.caramel }} /> Today's Tasks
          </h2>

          {/* Add Task Input */}
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Add a task..."
              className="flex-1 p-3 rounded-lg outline-none"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              style={{
                border: `1px solid ${theme.cream}`,
                background: theme.foam,
              }}
            />

            <button
              onClick={addTask}
              className="px-4 rounded-lg text-white flex items-center gap-1"
              style={{
                background: `linear-gradient(135deg, ${theme.accent.caramel}, ${theme.accent.cinnamon})`,
              }}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-3 rounded-lg transition shadow-sm"
                style={{
                  background: theme.foam,
                  border: `1px solid ${theme.cream}`,
                }}
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <CheckCircle
                    className="w-6 h-6"
                    style={{
                      color: task.completed
                        ? theme.accent.caramel
                        : theme.cream,
                    }}
                  />
                  <span
                    className={`font-medium ${
                      task.completed ? "line-through opacity-60" : ""
                    }`}
                    style={{ color: theme.espresso }}
                  >
                    {task.label}
                  </span>
                </div>

                <Trash2
                  className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                  style={{ color: theme.accent.cinnamon }}
                  onClick={() => deleteTask(task.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ======================= POMODORO TIMER ======================= */}
        <div
          className="p-6 rounded-xl shadow-lg flex flex-col items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${theme.milk}, white)`,
            border: `1px solid ${theme.cream}`,
          }}
        >
          <h2
            className="text-2xl font-bold mb-6 flex items-center gap-2"
            style={{ color: theme.espresso }}
          >
            <Clock style={{ color: theme.accent.cinnamon }} /> Study Timer
          </h2>

          <div
            className="text-6xl font-bold mb-6"
            style={{ color: theme.espresso }}
          >
            {formatTime()}
          </div>

          <div className="flex gap-4">
            {!isRunning ? (
              <button
                onClick={() => setIsRunning(true)}
                className="px-6 py-2 rounded-lg text-white font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent.caramel}, ${theme.accent.cinnamon})`,
                }}
              >
                Start
              </button>
            ) : (
              <button
                onClick={() => setIsRunning(false)}
                className="px-6 py-2 rounded-lg text-white font-semibold"
                style={{
                  background: theme.mocha,
                }}
              >
                Pause
              </button>
            )}

            <button
              onClick={() => {
                setIsRunning(false);
                setSeconds(0);
              }}
              className="px-6 py-2 rounded-lg font-semibold"
              style={{
                background: theme.cream,
                color: theme.espresso,
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preparation;
