import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, CornerDownLeft, Eye } from "lucide-react";

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    let keyBuffer = "";
    let bufferTimeout;

    const handleKeyDown = (e) => {
      // Ignore keypresses if typing in input, textarea, or contenteditable elements
      const target = e.target;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const key = e.key.toLowerCase();

      // Check single-key shortcuts first
      if (shortcuts[key] && typeof shortcuts[key] === "function") {
        e.preventDefault();
        shortcuts[key]();
        return;
      }

      // Check multi-key sequential shortcuts (like 'g' then 'p')
      keyBuffer += key;
      clearTimeout(bufferTimeout);

      // Look for a match in keyBuffer
      const matchingShortcut = Object.keys(shortcuts).find(
        (seq) => seq.length > 1 && keyBuffer.endsWith(seq)
      );

      if (matchingShortcut) {
        e.preventDefault();
        shortcuts[matchingShortcut]();
        keyBuffer = "";
      }

      // Clear buffer after 1 second of inactivity
      bufferTimeout = setTimeout(() => {
        keyBuffer = "";
      }, 1000);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(bufferTimeout);
    };
  }, [shortcuts]);
};

const KeyboardShortcuts = ({ onToggleConsole, onToggleDiagnostics }) => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = {
    // Single key toggle console
    "`": onToggleConsole,
    "~": onToggleConsole,
    "d": onToggleDiagnostics,
    
    // Multi key navigation sequence (g + p, g + c, etc)
    "gp": () => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    },
    "gc": () => {
      document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
    },
    "ga": () => {
      const aboutSec = document.getElementById("about") || document.querySelector("section");
      aboutSec?.scrollIntoView({ behavior: "smooth" });
    },
    "gh": () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  };

  useKeyboardShortcuts(shortcuts);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-3 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white shadow-lg backdrop-blur-sm border border-blue-400/30"
        title="Keyboard Shortcuts"
      >
        <Keyboard size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute bottom-16 right-0 p-4 rounded-xl border bg-gray-900/95 border-gray-700/80 text-white w-64 shadow-2xl backdrop-blur-md"
          >
            <h4 className="font-semibold text-sm border-b border-gray-700 pb-2 mb-2 flex items-center gap-2">
              <Keyboard size={16} className="text-blue-400" />
              Keyboard Shortcuts
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Toggle Console</span>
                <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-[10px] font-mono">`</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Toggle Diagnostics</span>
                <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-[10px] font-mono">D</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Go to Home</span>
                <span className="flex gap-0.5 items-center">
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-[10px] font-mono">G</kbd>
                  <span>+</span>
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-[10px] font-mono">H</kbd>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Go to Projects</span>
                <span className="flex gap-0.5 items-center">
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-[10px] font-mono">G</kbd>
                  <span>+</span>
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-[10px] font-mono">P</kbd>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Go to Contacts</span>
                <span className="flex gap-0.5 items-center">
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-[10px] font-mono">G</kbd>
                  <span>+</span>
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-[10px] font-mono">C</kbd>
                </span>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-800 flex justify-between items-center text-[10px] text-gray-500">
              <span>Press shortcut directly</span>
              <CornerDownLeft size={10} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KeyboardShortcuts;
