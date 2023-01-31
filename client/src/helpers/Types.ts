import { type } from "os";

export interface State {
  guess: string;
  styles: Style[];
  toCheck: boolean;
  try?: number;
}

export interface Style {
  [key: string]: string[];
}

export interface Action {
  type:
    | "add"
    | "delete"
    | "addAndCheck"
    | "response:invalid-word"
    | "response:success"
    | "fail";

  letter?: string;
  dataFromServer?: any;
}

export interface toDisplayProp {
  active: boolean;
  input: string | "";
  style: Style | undefined;
}

export type PropsType = { toDisplay: toDisplayProp };
