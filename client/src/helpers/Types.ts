export interface State {
  current: 0 | 1 | 2 | 3 | 4;
  guess: string;
  toCheck: boolean;
}

export interface Action {
  type: "add" | "delete" | "addAndCheck" | "answer-success" | "answer-fail";
  letter?: string;
  dataFromServer?: string | string[];
}
