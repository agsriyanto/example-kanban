import { useState } from 'react';
import { useAtom, useSetAtom  } from 'jotai';

import Navbar from '../components/navbar';
import Board from '../components/board';
import { Task } from '../types';
import { tasksAtom, addTaskAtom, deleteTaskAtom, updateTaskAtom } from '../actions/tasks';
import Modal from '../components/modal';
import ConfirmationModal from '../components/modal/confirmation';
import Toast from '../components/toast';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Dashboard = () => {
  const [ tasks, setTasks ] = useAtom(tasksAtom);
  const addTask = useSetAtom(addTaskAtom);
  const deleteTask = useAtom(deleteTaskAtom)[1];
  const updateTask = useSetAtom(updateTaskAtom);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [isModalVisibleConfirmation, setModalVisibleConfirmation] = useState<boolean>(false);
  const [type, setType] = useState<'NEW' | 'UPDATE' | "DETAIL" | null>(null);
  const [title, setTitle] = useState<string>('');
  const [form, setForm] = useState<Task>({ name: "", description: "", teams: [], priority: "" });
  const [detailTask, setDetailTask] = useState<Task | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 1000);
  };

  console.log({tasks});
  const filteredTasks = tasks?.filter((task: Task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(task.id).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVisibleModal = (
    type: "NEW" | "UPDATE" | "DETAIL" | null,
    task?: Task
  ) => {
    if (type !== "UPDATE") {
      setModalVisible((prev) => !prev);
    }

    setType(type);

    switch (type) {
      case "DETAIL":
        setTitle("Task Details");
        break;
      case "UPDATE":
        setTitle("Form Update Task");
        break;
      case "NEW":
      default:
        setTitle("Form Create Task");
    }

    if (task) {
      setDetailTask(task);
      setForm({
        name: task.name || "",
        description: task.description || "",
        teams: task.teams || [],
        priority: task.priority || "",
      });
    }

    if (type === "NEW") {
      setForm({ name: "", description: "", teams: [], priority: "" });
    }
  };

  const handleModalConfirmation = () => {
    setModalVisible(false);
    setModalVisibleConfirmation(true);
  };

  const handleSubmit = async () => {
    if (title === 'Form Create Task') {
    await addTask(form);
    showToast("Task added successfully!", "success");
    } else if (title === 'Form Update Task') {
      if (detailTask && detailTask.id) {
        await updateTask({ id: detailTask.id, updatedTask: form });
        showToast("Task updated successfully!", "success");
      }
    }

    setForm({ name: "", description: "", teams: [], priority: "" });
    setModalVisible(false);
  };

  const handleDelete = async (id: string | number) => {
    await deleteTask(id);
    setModalVisibleConfirmation(false);
    showToast("Task deleted successfully!", "success")
  };

   const taskByStatus = {
    "TO DO": filteredTasks.filter((task: Task) => task.status === "TO DO"),
    "DOING": filteredTasks.filter((task: Task) => task.status === "DOING"),
    "DONE": filteredTasks.filter((task: Task) => task.status === "DONE"),
  };

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
  
    // If dropped outside the list
    if (!destination) {
      return;
    }
  
    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    
    // Get the task that was dragged
    const draggedTask = tasks[sourceIndex];
    
    // Update the task's status based on the new column (destination)
    draggedTask.status = destination.droppableId; // Update status to the new board
  
    // Reorder the tasks (move the dragged task in the array)
    const reorderedTasks = Array.from(tasks);
    reorderedTasks.splice(sourceIndex, 1);
    reorderedTasks.splice(destinationIndex, 0, draggedTask);
  
    console.log({reorderedTasks});
    setTasks(reorderedTasks);
  };

  return (
    <>
      <Navbar />
      <div className="h-screen p-10 pt-20 flex flex-col gap-3">
        <div className='flex justify-between'>
          <input
            type="text"
            placeholder="Search by name or ID..."
            className="p-2 border border-gray-300 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleVisibleModal('NEW')}>
            Add Task
          </button>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-rows-3 gap-10 md:grid-rows-1 md:grid-cols-3 overflow-x-auto">
            {(["TO DO", "DOING", "DONE"] as ("TO DO" | "DOING" | "DONE")[]).map((status, i) => (
              <Board
                index={i}
                key={status}
                title={status}
                styles={
                  status === "TO DO"
                    ? "bg-[#65CBE9] text-white font-bold"
                    : status === "DOING"
                    ? "bg-[#ffd255] text-white font-bold"
                    : "bg-[#4bed5f] text-white font-bold"
                }
                tasks={taskByStatus[status]}
                openModal={handleVisibleModal}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={handleVisibleModal}
        type={type}
        title={title}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        detailTask={detailTask}
        handleModalConfirmation={handleModalConfirmation}
      />
      <ConfirmationModal
        isVisible={isModalVisibleConfirmation}
        onClose={() => setModalVisibleConfirmation(!isModalVisibleConfirmation)}
        onSubmit={handleDelete}
        detailTask={detailTask}
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
};

export default Dashboard;