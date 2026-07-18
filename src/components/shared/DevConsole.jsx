import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, ChevronRight } from "lucide-react";

const TOTAL_HEIGHT = 320; // px — total panel height
const TITLEBAR_HEIGHT = 36;
const INPUTROW_HEIGHT = 38;
const OUTPUT_HEIGHT = TOTAL_HEIGHT - TITLEBAR_HEIGHT - INPUTROW_HEIGHT;

const COMMANDS = {
  help: () => [
    "Available commands:",
    "  help         — Show this menu",
    "  about        — About Safal",
    "  skills       — Technical proficiency",
    "  projects     — Portfolio projects",
    "  contact      — Contact details",
    "  diagnostics  — Site health metrics",
    "  clear        — Clear the screen",
    "  exit         — Close the console",
    "  sudo hire    — Proceed to checkout!",
  ],
  about: () => [
    "About Safal Gotame:",
    "  Full Stack Developer · 2+ years experience",
    "  React · Node.js · Express · SQL/NoSQL · Microservices",
    "  Building creative, performant web interfaces.",
  ],
  skills: () => [
    "Technical Proficiency:",
    "  React/Next.js  [████████████████████] 95%",
    "  Node/Express   [██████████████████  ] 90%",
    "  SQL/NoSQL      [█████████████████   ] 85%",
    "  Docker/DevOps  [███████████████     ] 75%",
  ],
  projects: () => [
    "Portfolio Projects:",
    "  1. AI Portfolio Intelligence  (Python · FastAPI · React)",
    "  2. Decentralized Social Net   (Solidity · React Native)",
    "  Tip: type 'sudo hire' to proceed to checkout!",
  ],
  contact: () => [
    "Contact:",
    "  Email    → lamichhanem36@gmail.com",
    "  LinkedIn → linkedin.com/in/safal-gotame-1a8730266",
    "  GitHub   → github.com/GotameSafal",
  ],
};

const DevConsole = ({ isOpen, onClose, onOpenDiagnostics }) => {
  const [history, setHistory] = useState([
    { kind: "sys", text: "Gotame Developer Console  [v1.0.0]" },
    { kind: "sys", text: "Type 'help' for commands.  Esc to close." },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const outputRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll output to bottom whenever history changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  const runCommand = useCallback(
    (raw) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const lower = trimmed.toLowerCase();
      const [cmd, ...rest] = lower.split(" ");
      const arg = rest.join(" ");

      const addLines = (lines) =>
        setHistory((prev) => [
          ...prev,
          { kind: "input", text: trimmed },
          ...lines.map((text) => ({ kind: "output", text })),
        ]);

      setCmdHistory((prev) => [...prev, trimmed]);
      setHistoryIdx(-1);
      setInput("");

      if (cmd === "clear") {
        setHistory([]);
        setTimeout(focusInput, 0);
        return;
      }
      if (cmd === "exit") {
        onClose();
        return;
      }
      if (cmd === "sudo" && arg === "hire") {
        addLines([
          "ACCESS GRANTED — generating contract…",
          "Redirecting to contacts section…",
        ]);
        setTimeout(() => {
          onClose();
          document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
        }, 900);
        setTimeout(focusInput, 0);
        return;
      }
      if (cmd === "diagnostics") {
        addLines(["Opening diagnostics drawer…"]);
        setTimeout(onOpenDiagnostics, 300);
        setTimeout(focusInput, 0);
        return;
      }
      if (COMMANDS[cmd]) {
        addLines(COMMANDS[cmd]());
        setTimeout(focusInput, 0);
        return;
      }

      addLines([`Command not found: '${cmd}'.  Type 'help' for suggestions.`]);
      setTimeout(focusInput, 0);
    },
    [onClose, onOpenDiagnostics, focusInput]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      runCommand(input);
    } else if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const idx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(idx);
      setInput(cmdHistory[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const idx = historyIdx + 1;
      if (idx >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(idx);
        setInput(cmdHistory[idx]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: TOTAL_HEIGHT }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: TOTAL_HEIGHT }}
          transition={{ type: "spring", damping: 26, stiffness: 300 }}
          onClick={focusInput}
          className="fixed inset-x-0 bottom-0 z-[99999] flex flex-col bg-[#0d0d0d] border-t border-emerald-900/40 shadow-[0_-4px_40px_rgba(0,0,0,0.6)] font-mono"
          style={{ height: TOTAL_HEIGHT }}
        >
          {/* ── Title bar ── */}
          <div
            className="flex items-center justify-between px-4 border-b border-white/5 select-none shrink-0"
            style={{ height: TITLEBAR_HEIGHT }}
          >
            <div className="flex items-center gap-2 text-emerald-400 text-xs">
              <TerminalIcon size={13} />
              <span>gotame@developer:~</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-[10px]">Esc to close</span>
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="p-1 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* ── Scrollable output area ── */}
          <div
            ref={outputRef}
            className="overflow-y-auto px-4 py-2 space-y-0.5 text-[11px] leading-[1.55]"
            style={{ height: OUTPUT_HEIGHT, minHeight: 0 }}
          >
            {history.map((line, i) => {
              if (line.kind === "input") {
                return (
                  <div key={i} className="flex items-center gap-1 text-emerald-300 mt-1">
                    <ChevronRight size={11} className="shrink-0" />
                    <span>{line.text}</span>
                  </div>
                );
              }
              if (line.kind === "error") {
                return (
                  <div key={i} className="text-red-400 pl-4 whitespace-pre">
                    {line.text}
                  </div>
                );
              }
              return (
                <div key={i} className="text-gray-400 pl-4 whitespace-pre">
                  {line.text}
                </div>
              );
            })}
          </div>

          {/* ── Input row — always visible at bottom ── */}
          <div
            className="flex items-center gap-2 px-4 border-t border-white/5 shrink-0"
            style={{ height: INPUTROW_HEIGHT }}
          >
            <span className="text-emerald-400 text-[11px] shrink-0">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white text-[11px] caret-emerald-400"
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DevConsole;
