import React, { useState } from "react";
import { TaskListProps, Task } from "../types";

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onMarkComplete, onDelete }) => {
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const pendingTasks = tasks.filter((task: Task) => task.status === "pending");
  const categories = [...new Set(pendingTasks.map((task: Task) => task.category))];

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(`${dateStr}T00:00:00`);
    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const filteredTasks = pendingTasks
    .filter((task: Task) => {
      const matchesCategory = filterCategory ? task.category === filterCategory : true;
      const matchesSearch = searchTerm
        ? task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.details.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.startDate}T00:00:00`).getTime();
      const dateB = new Date(`${b.startDate}T00:00:00`).getTime();
      return dateA - dateB; // เก่าสุด -> ใหม่สุด
    });

  const handleMarkComplete = (taskId: string): void => {
    onMarkComplete(taskId);
  };

  const handleEditTask = (task: Task): void => {
    onEdit(task);
  };

  const handleDeleteTask = (taskId: string): void => {
    onDelete(taskId);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-white rounded-lg shadow-xl mt-8 flex flex-col h-[calc(100vh-160px)]">
      {/* ส่วนหัวข้อ + filter/search: fixed */}
      <div className="sticky top-0 bg-white pb-4 z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8">รายการทั้งหมด</h2>

        <div className="flex flex-col gap-3 md:gap-4 mb-2">
          {/* Dropdown กรองตามประเภท */}
          <div className="w-full">
            <label htmlFor="filterCategory" className="sr-only">
              กรองตามประเภท
            </label>
            <select
              id="filterCategory"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">-- กรองตามประเภททั้งหมด --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* ช่องค้นหา */}
          <div className="w-full">
            <label htmlFor="searchTask" className="sr-only">
              ค้นหารายการ
            </label>
            <input
              type="text"
              id="searchTask"
              placeholder="ค้นหารายการสิ่งที่ต้องทำ..."
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ส่วนรายการ: scrollable */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">ไม่มีรายการที่ต้องทำ</p>
        ) : (
          <ul className="space-y-4 pb-4">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">{task.title}</h3>
                    <p className="text-gray-700 text-sm mb-2">{task.details}</p>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center text-xs text-gray-500 mb-3 gap-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full w-fit">
                        ประเภท: {task.category}
                      </span>
                      <span className="text-xs text-gray-500 px-2 py-1">
                        ระยะเวลา: {formatDate(task.startDate)} - {formatDate(task.endDate)}
                      </span>
                    </div>
                  </div>

                  {/* ปุ่ม action */}
                  <div className="flex justify-end space-x-2 mt-auto">
                    <button
                      onClick={() => handleMarkComplete(task.id)}
                      className="px-3 py-1 bg-green-600 text-white text-xs rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out shadow-md"
                    >
                      สำเร็จ
                    </button>
                    <button
                      onClick={() => handleEditTask(task)}
                      className="px-3 py-1 bg-yellow-500 text-white text-xs rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200 ease-in-out shadow-md"
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="px-3 py-1 bg-red-600 text-white text-xs rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 ease-in-out shadow-md"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
