"use client";
import React, { useState, useEffect } from "react";
import { Task, TaskFormData, ModalState, NotificationState, PageType } from "../types";
import Modal from "../components/Modal";
import Notification from "../components/Notification";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import CompletedTasks from "../components/CompletedTasks";

// Utility function to generate a unique ID
const generateId = (): string => "_" + Math.random().toString(36).substr(2, 9);

// Main App Component
const App = (): React.JSX.Element => {
  // State to manage the current page view
  const [currentPage, setCurrentPage] = useState<PageType>("addTask");
  // State to store all tasks (pending and completed)
  const [tasks, setTasks] = useState<Task[]>([]);
  // State to hold the task being edited
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  // State for modal visibility and content
  const [modal, setModal] = useState<ModalState>({
    isVisible: false,
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
    confirmText: "ยืนยัน",
    cancelText: "ยกเลิก",
  });
  // State for notification messages
  const [notification, setNotification] = useState<NotificationState>({
    isVisible: false,
    message: "",
    type: "success",
  });

  // Load tasks from localStorage on initial mount
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("todoTasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks from localStorage:", error);
    }
  }, []);

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    try {
      localStorage.setItem("todoTasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
    }
  }, [tasks]);

  // Function to show a temporary notification
  const showNotification = (message: string, type: "success" | "error" = "success"): void => {
    setNotification({ isVisible: true, message, type });
    setTimeout(() => {
      setNotification({ isVisible: false, message: "", type: "success" });
    }, 3000); // Notification disappears after 3 seconds
  };

  // Function to add a new task
  const addTask = (newTask: TaskFormData): void => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask, id: generateId(), status: "pending" }]);
    showNotification("เพิ่มกิจกรรมสำเร็จ!", "success");
    setCurrentPage("taskList");
  };

  // Function to update an existing task
  const updateTask = (updatedTask: Task): void => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    showNotification("แก้ไขกิจกรรมสำเร็จ!", "success");
    setCurrentPage("taskList");
    setEditingTask(null); // Clear editing state
  };

  // Function to mark a task as completed
  const markTaskAsCompleted = (id: string): void => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, status: "completed" } : task)));
    showNotification("กิจกรรมถูกทำสำเร็จแล้ว!", "success");
  };

  // Function to delete a task
  const deleteTask = (id: string): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    showNotification("ลบกิจกรรมสำเร็จ!", "success");
  };

  return (
    <div className="h-screen bg-gray-100 text-gray-900 font-sans flex flex-col items-center p-4 sm:p-8">
      <Modal
        isVisible={modal.isVisible}
        message={modal.message}
        onConfirm={modal.onConfirm}
        onCancel={modal.onCancel}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
      />

      {/* Navigation bar moved to top */}
      <header className="w-full max-w-4xl flex justify-center mb-8 mt-4">
        <nav className="flex space-x-4 bg-white p-3 rounded-full shadow-lg">
          <button
            onClick={() => {
              setCurrentPage("taskList");
              setEditingTask(null);
            }}
            className={`p-3 rounded-full transition-all duration-200 ease-in-out relative group ${
              currentPage === "taskList" ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-200"
            }`}
            title="รายการสิ่งที่ต้องทำ"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </button>

          <button
            onClick={() => {
              setCurrentPage("addTask");
              setEditingTask(null);
            }}
            className={`p-3 rounded-full transition-all duration-200 ease-in-out relative group ${
              currentPage === "addTask" ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-200"
            }`}
            title="เพิ่มกิจกรรม"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>

          <button
            onClick={() => {
              setCurrentPage("completedTasks");
              setEditingTask(null);
            }}
            className={`p-3 rounded-full transition-all duration-200 ease-in-out relative group ${
              currentPage === "completedTasks" ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-gray-200"
            }`}
            title="กิจกรรมที่ทำสำเร็จ"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </nav>
      </header>

      {/* Main content */}
      <main className="w-full max-w-4xl flex-1">
        {currentPage === "taskList" && (
          <TaskList
            tasks={tasks}
            onEdit={(task) => {
              setEditingTask(task);
              setCurrentPage("addTask");
            }}
            onMarkComplete={markTaskAsCompleted}
            onDelete={deleteTask}
          />
        )}
        {currentPage === "addTask" && (
          <AddTaskForm
            onSave={addTask}
            onUpdate={updateTask}
            taskToEdit={editingTask}
            onCancelEdit={() => {
              setEditingTask(null);
              setCurrentPage("taskList");
            }}
          />
        )}
        {currentPage === "completedTasks" && <CompletedTasks tasks={tasks} onDelete={deleteTask} />}
      </main>

      {/* Notification at bottom right */}
      <Notification isVisible={notification.isVisible} message={notification.message} type={notification.type} />
    </div>
  );
};

export default App;
