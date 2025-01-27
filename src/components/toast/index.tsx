const Toast = ({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <span>{type === "success" ? "✅" : "❌"}</span>
        <span>{message}</span>
        <button
          className="ml-4 text-sm font-bold text-black"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Toast;
