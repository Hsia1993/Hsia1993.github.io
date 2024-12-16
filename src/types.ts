export interface Command {
  name: string;
  description: string;
  action: (params: any) => Action;
  shortcut?: string;
}

type ActionType = "console" | "clean" | "link" | "download" | "clean-current";

export interface Action {
  type: ActionType;
  content: string;
}
