import { Task } from "../../types";

interface ModalProps {
  isVisible: boolean;
  onClose?: () => void;
  onSubmit: (id: string | number) => void;
  detailTask?: Task | null;
}

const ConfirmationModal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  detailTask,
  onSubmit
}) => {

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50" onClick={handleBackdropClick}>
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
        <p className="mb-4">Do you really want to delete this task? This action cannot be undone.</p>
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => detailTask?.id !== undefined && onSubmit(detailTask.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
};

export default ConfirmationModal;