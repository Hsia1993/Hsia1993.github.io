import { useState, KeyboardEvent, useEffect, useRef } from "react";
import "../App.css";
import { useCommands } from "./useCommands";
const intro = `

██████╗ ██╗  ██╗██╗██╗         ██╗  ██╗██╗ █████╗ 
██╔══██╗██║  ██║██║██║         ╚██╗██╔╝██║██╔══██╗
██████╔╝███████║██║██║          ╚███╔╝ ██║███████║
██╔═══╝ ██╔══██║██║██║          ██╔██╗ ██║██╔══██║
██║     ██║  ██║██║███████╗    ██╔╝ ██╗██║██║  ██║
╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝

Welcome to my website\nplease type help for more information!
`;
function App() {
  const [hostname, setHostname] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const {
    commandHistory,
    executeCommand,
    clearHistory,
    currentCommand,
    onAutocomplete,
    onShortcut,
    setCurrentCommand,
  } = useCommands();

  useEffect(() => {
    const domain = window.location.hostname;
    setHostname(domain === "localhost" ? domain : domain.replace(/^www\./, ""));
  }, []);

  useEffect(() => {
    inputRef.current?.focus();

    const handleClick = () => {
      const selection = window.getSelection()?.toString();
      if (!selection) {
        inputRef.current?.focus();
      }
    };

    const handleKeyboardShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        onShortcut(e.key, () => e.preventDefault());
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyboardShortcut as any);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyboardShortcut as any);
    };
  }, [clearHistory]);

  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop =
        terminalContentRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentCommand);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const input = currentCommand.toLowerCase();
      onAutocomplete(input);
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-button close"></span>
          <span className="terminal-button minimize"></span>
          <span className="terminal-button maximize"></span>
        </div>
        <div className="terminal-title">guest@{hostname} ~ </div>
      </div>

      <div ref={terminalContentRef} className="terminal-content">
        {intro
          .trim()
          .split("\n")
          .map((line) => (
            <pre className="output output__intro">{line}</pre>
          ))}
        {commandHistory.map((line, index) => (
          <pre
            key={index}
            className={line.startsWith("$") ? "command-line" : "output"}
            style={{ userSelect: "text" }}
          >
            {line}
          </pre>
        ))}

        <div className="command-line">
          <span className="prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
            className="command-input"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}

export default App;
