import { Command } from "../types";

const commands: Command[] = [
  {
    name: "help",
    shortcut: "h",
    description: "Show all messages",
    action: () => {
      return {
        type: "console",
        content: commands
          .filter(({ name }) => name !== "help")
          .map(({ name, description }) => `- ${name}: ${description}`)
          .join("\n"),
      };
    },
  },
  {
    name: "clear",
    shortcut: "l",
    description: "Clear all messages",
    action: () => {
      return {
        type: "clean",
        content: "",
      };
    },
  },
  {
    name: "about",
    description: "About me",
    action: () => {
      return {
        type: "console",
        content: "I am Phil, a frontend developer based in Waterloo, Canada.",
      };
    },
  },
  {
    name: "github",
    description: "Open my github",
    action: () => {
      return {
        type: "link",
        content: "https://github.com/Hsia1993",
      };
    },
  },
  {
    name: "linkedin",
    description: "Open my linkedin",
    action: () => {
      return {
        type: "link",
        content: "https://www.linkedin.com/in/dongxu-xia-53056a12b/",
      };
    },
  },
];
const defaultCommand: Command = {
  name: "console",
  description: "Default command for unknown commands or empty command",
  action: (command: string) => {
    return {
      type: "console",
      content: command
        ? `Command not found: ${command}.\nType 'help' for available commands.`
        : "",
    };
  },
};
const keyboardCommands: Command[] = [
  {
    name: "clearCurrentInput",
    shortcut: "u",
    description: "Clear current input",
    action: () => {
      return {
        type: "clean-current",
        content: "",
      };
    },
  },
];

export default class CommandUtils {
  static defaultCommand = defaultCommand;
  static commands = commands;
  static keyboardCommands = keyboardCommands;
  static getAction(command: string) {
    return (
      this.commands.find(({ name }) => name === command)?.action(command) ||
      this.defaultCommand.action(command)
    );
  }
  static getAutocomplete(input: string) {
    return this.commands.find(({ name }) =>
      name.toLowerCase().startsWith(input)
    )?.name;
  }
  static getShortcut(keyStroke: string) {
    return [...this.commands, ...this.keyboardCommands].find(
      ({ shortcut }) => shortcut === keyStroke
    );
  }
}
