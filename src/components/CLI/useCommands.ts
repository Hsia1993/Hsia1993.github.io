import { useCallback, useState } from "react";
import CommandUtils from "./commandUtils";
import { Action } from "../../types";

export const useCommands = () => {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>("");
  const clearHistory = useCallback(() => {
    setCommandHistory([]);
  }, []);
  const runAction = useCallback(
    (action: Action) => {
      if (action.type === "console") {
        setCommandHistory([
          ...commandHistory,
          `$ ${currentCommand}`,
          action.content,
        ]);
      } else if (action.type === "clean") {
        clearHistory();
      } else if (action.type === "link") {
        window.open(action.content, "_blank");
      } else if (action.type === "download") {
        window.open(action.content, "_blank");
      } else if (action.type === "clean-current") {
        setCurrentCommand("");
      }
    },
    [commandHistory, currentCommand, clearHistory]
  );
  const executeCommand = useCallback(
    (currentCommand: string) => {
      const action = CommandUtils.getAction(currentCommand);
      if (action) {
        runAction(action);
        setCurrentCommand("");
      }
    },
    [commandHistory, clearHistory, runAction]
  );
  const onAutocomplete = useCallback((input: string) => {
    const match = CommandUtils.getAutocomplete(input);
    if (match) {
      setCurrentCommand(match);
    }
  }, []);

  const onShortcut = useCallback(
    (keyStroke: string, onPreventDefault: () => void) => {
      const command = CommandUtils.getShortcut(keyStroke);
      if (command) {
        onPreventDefault();
        runAction(command.action(command.name));
      }
    },
    [executeCommand]
  );

  return {
    commandHistory,
    executeCommand,
    clearHistory,
    currentCommand,
    setCurrentCommand,
    onAutocomplete,
    onShortcut,
  };
};
