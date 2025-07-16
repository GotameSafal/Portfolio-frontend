import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  type = "danger" // danger, warning, info
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          iconColor: "text-red-400",
          confirmButton: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
          borderColor: "border-red-500/20"
        };
      case "warning":
        return {
          iconColor: "text-yellow-400",
          confirmButton: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
          borderColor: "border-yellow-500/20"
        };
      default:
        return {
          iconColor: "text-blue-400",
          confirmButton: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
          borderColor: "border-blue-500/20"
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border ${styles.borderColor}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-full bg-gray-700 ${styles.iconColor}`}>
                <AlertTriangle size={20} />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              {message}
            </p>

            <div className="flex space-x-3 justify-end">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={`px-4 py-2 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed ${styles.confirmButton}`}
              >
                {isLoading ? "Processing..." : confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;
