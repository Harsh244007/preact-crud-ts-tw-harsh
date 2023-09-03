import { FC, memo, useEffect, useState } from "preact/compat";

import TaskList from "./TaskList";
import AddTask from "./AddTask";

const Todo: FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const cachedTasks = localStorage.getItem("tasks");
    if (cachedTasks) {
      setTasks(JSON.parse(cachedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask: string) => {
    setTasks([...tasks, newTask]);
  };

  const handleEditTask = (index: number, updatedTask: string) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="my-8 mx-auto max-w-md p-4 border border-blue-500 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Task List</h1>
      <AddTask onAdd={handleAddTask} />
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
};

export default memo(Todo);
