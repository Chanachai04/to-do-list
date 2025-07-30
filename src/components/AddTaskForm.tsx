import React, { useState, useEffect } from "react";
import { AddTaskFormProps, TaskFormData } from "../types";

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onSave, onUpdate, taskToEdit, onCancelEdit }) => {
  const [title, setTitle] = useState<string>(taskToEdit?.title || "");
  const [details, setDetails] = useState<string>(taskToEdit?.details || "");
  const [category, setCategory] = useState<string>(taskToEdit?.category || "");
  const [startDate, setStartDate] = useState<string>(taskToEdit?.startDate || "");
  const [endDate, setEndDate] = useState<string>(taskToEdit?.endDate || "");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDetails(taskToEdit.details);
      setCategory(taskToEdit.category);
      setStartDate(taskToEdit.startDate);
      setEndDate(taskToEdit.endDate);
    }
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const taskData: TaskFormData = { title, details, category, startDate, endDate };

    // For now, we'll use a simple confirmation
    if (taskToEdit) {
      onUpdate({ ...taskToEdit, ...taskData });
    } else {
      onSave(taskData);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl bg-white rounded-lg shadow-xl mt-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8">
        {taskToEdit ? "แก้ไขรายการ" : "เพิ่มรายการ"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            หัวข้อ
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
            รายละเอียด
          </label>
          <textarea
            id="details"
            rows={3}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            ประเภท (เช่น เก็บเงิน, ซื้อของ)
          </label>
          <input
            type="text"
            id="category"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              ระยะเวลาเริ่มต้น
            </label>
            <input
              type="date"
              id="startDate"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              ระยะเวลาสิ้นสุด
            </label>
            <input
              type="date"
              id="endDate"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          {taskToEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 ease-in-out shadow-md"
            >
              ยกเลิก
            </button>
          )}
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out shadow-lg"
          >
            {taskToEdit ? "แก้ไขรายการ" : "บันทึก"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
