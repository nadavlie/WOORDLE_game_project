import { type } from "os";

export interface State {
  guess: string;
  styles: Style[];
  toCheck: boolean;
  try?: number;
  colorsMap: Map<string, string>;
  win: boolean;
}

export interface Style {
  [key: string]: string[];
}

export interface Action {
  type:
    | "add"
    | "delete"
    | "addBeforeCheck"
    | "response:invalid-word"
    | "response:success"
    | "fail"
    | "check";

  letter?: string;
  dataFromServer?: any;
  helper?: any;
}

export interface toDisplayProp {
  active: boolean;
  input: string | "";
  style: Style | undefined;
}

export type PropsType = { toDisplay: toDisplayProp };
export type PropsformType = {
  loginHandler: () => void;
  SubmitionForm: (name: string) => void;
};
