import React from "react";
import { CompletedTasksProps, Task } from "../types";

const CompletedTasks: React.FC<CompletedTasksProps> = ({ tasks, onDelete }) => {
  const completedTasks = tasks.filter((task: Task) => task.status === "completed");

  const handleDeleteTask = (taskId: string): void => {
    onDelete(taskId);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-white rounded-lg shadow-xl mt-8 flex flex-col h-[calc(100vh-160px)]">
      {/* ส่วนหัวข้อ sticky */}
      <div className="sticky top-0 bg-white pb-4 z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8">รายการที่ทำสำเร็จ</h2>
      </div>

      {/* ส่วนรายการ scroll */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {completedTasks.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">ไม่มีรายการที่ทำสำเร็จ</p>
        ) : (
          <ul className="space-y-4 pb-4">
            {completedTasks.map((task) => (
              <li
                key={task.id}
                className="bg-green-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-green-200"
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-green-800 mb-1">{task.title}</h3>
                    <p className="text-green-700 text-sm mb-2">{task.details}</p>
                    <div className="flex flex-wrap items-center text-xs text-green-600 mb-1">
                      <span className="bg-green-200 text-green-900 px-2 py-1 rounded-full">
                        ประเภท: {task.category}
                      </span>
                    </div>
                  </div>

                  {/* ปุ่มลบ */}
                  <div className="flex justify-end mt-auto">
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

export default CompletedTasks;
