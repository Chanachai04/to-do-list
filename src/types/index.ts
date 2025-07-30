// Task status types
export type TaskStatus = "pending" | "completed";

// Task interface
export interface Task {
  id: string;
  title: string;
  details: string;
  category: string;
  startDate: string;
  endDate: string;
  status: TaskStatus;
}

// Task form data (without id and status)
export interface TaskFormData {
  title: string;
  details: string;
  category: string;
  startDate: string;
  endDate: string;
}

// Modal state interface
export interface ModalState {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
  cancelText: string;
}

// Notification state interface
export interface NotificationState {
  isVisible: boolean;
  message: string;
  type: "success" | "error";
}

// Action modal state interface
export interface ActionModalState {
  isVisible: boolean;
  task: Task | null;
}

// Page types
export type PageType = "taskList" | "addTask" | "completedTasks";

// Component props interfaces
export interface ModalProps {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
  cancelText: string;
  children?: React.ReactNode;
}

export interface NotificationProps {
  isVisible: boolean;
  message: string;
  type: "success" | "error";
}

export interface AddTaskFormProps {
  onSave: (taskData: TaskFormData) => void;
  onUpdate: (task: Task) => void;
  taskToEdit: Task | null;
  onCancelEdit: () => void;
}

export interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onMarkComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface CompletedTasksProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}

// Filter and search state
export interface FilterState {
  filterCategory: string;
  searchTerm: string;
}

// Form state for AddTaskForm
export interface TaskFormState {
  title: string;
  details: string;
  category: string;
  startDate: string;
  endDate: string;
}
