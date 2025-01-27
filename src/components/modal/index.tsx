import React from "react";
import { Task } from "../../types";
import Form from "../form";

interface ModalProps {
  isVisible: boolean;
  onClose?: (type: "NEW" | "UPDATE" | "DETAIL" | null) => void;
  title?: string;
  type?: "NEW" | "UPDATE" | "DETAIL" | null;
  onSubmit: (form: Task) => void;
  form?: Task;
  setForm?: React.Dispatch<React.SetStateAction<Task>>;
  detailTask?: Task | null;
  handleModalConfirmation?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  title,
  type,
  onSubmit,
  form,
  setForm,
  detailTask,
  handleModalConfirmation,
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose(null);
    }
  };

  const renderTaskDetails = () => {
    if (!detailTask) return <p>No task details available.</p>;

    return (
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Name:</p>
          <p className="text-lg font-medium text-gray-800">{detailTask.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Description:</p>
          <p className="text-base text-gray-700">{detailTask.description}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Teams:</p>
          <p className="text-base text-gray-700">
            {detailTask.teams.length > 0 ? detailTask.teams.join(", ") : "No teams assigned"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Priority:</p>
          <p className="text-base text-gray-700">{detailTask.priority}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status:</p>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              detailTask.status === "TO DO"
                ? "bg-blue-100 text-blue-600"
                : detailTask.status === "DOING"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {detailTask.status}
          </span>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => onClose && onClose('UPDATE')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Edit
          </button>

          <button
            onClick={() => handleModalConfirmation && handleModalConfirmation()}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    if (!form || !setForm || !onSubmit) return <p>Loading...</p>;

    return (
      <Form
        form={form}
        setForm={setForm}
        handleSubmit={(e) => {
          e.preventDefault();
          onSubmit(form);
        }}
      />
    );
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        {onClose && (
          <button
            className="text-gray-500 hover:text-gray-800 absolute top-4 right-4"
            onClick={() => onClose(null)}
          >
            &times;
          </button>
        )}
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {type === "DETAIL"
          ? renderTaskDetails()
          : (type === "NEW" || type === "UPDATE") && renderForm()}
      </div>
    </div>
  );
};

export default Modal;
