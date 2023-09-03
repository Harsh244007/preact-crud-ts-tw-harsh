import { ChangeEvent, FC, useState } from "preact/compat";

interface TaskListProps {
  tasks: string[];
  onDelete: (index: number) => void;
  onEdit: (index: number, updatedTask: string) => void;
}

const TaskList: FC<TaskListProps> = ({ tasks, onDelete, onEdit }) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<string>("");

  const handleStartEdit = (index: number, task: string) => {
    setEditIndex(index);
    setEditedTask(task);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedTask("");
  };

  const handleSaveEdit = (index: number) => {
    onEdit(index, editedTask);
    setEditIndex(null);
    setEditedTask("");
  };

  return (
    <ul className="list-disc flex flex-col gap-col-4 pb-4">
      {tasks.map((task, index) => (
        <li
          key={index}
          className="flex w-full justify-between items-center space-x-2 overflow-auto pb-4"
        >
          {editIndex === index ? (
            <>
              <input
                type="text"
                value={editedTask}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEditedTask((e.target as HTMLInputElement).value)
                }
                className="border border-gray-400 p-2 rounded-md flex-grow"
              />
              <button
                onClick={() => handleSaveEdit(index)}
                className="bg-blue-500 text-white px-3 py-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-300 text-gray-600 px-3 py-2 rounded-md"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {index+1}{" -"} {task}
              <button
                onClick={() => handleStartEdit(index, task)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
