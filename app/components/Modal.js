export default function Modal({
  isOpen,
  onClose,
  message,
  actionText,
  onAction,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
    >
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-xl text-center w-96">
        <h3 className="text-2xl font-bold">{message}</h3>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onAction}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-xl"
          >
            {actionText}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-xl"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
