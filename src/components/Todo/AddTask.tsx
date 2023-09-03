import { FC, useState, ChangeEvent } from "preact/compat";

interface AddTaskProps {
  onAdd: (newTask: string) => void;
}

const AddTask: FC<AddTaskProps> = ({ onAdd }) => {
  const [newTask, setNewTask] = useState<string>("");

  const handleAdd = () => {
    if (newTask) {
      onAdd(newTask);
      setNewTask("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = (e.target as HTMLInputElement).value; // Cast e.target to HTMLInputElement
    setNewTask(inputValue);
  };

  return (
    <div className="my-4 flex items-center  gap-2">
      <input
        type="text"
        placeholder="Enter task"
        value={newTask}
        onChange={handleInputChange}
        className="border border-gray-400 p-2 rounded-md flex-grow"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-3 py-2 rounded-md"
      >
        Add {"+"}
      </button>
    </div>
  );
};

export default AddTask;
