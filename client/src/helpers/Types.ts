export interface State {
  current: 0 | 1 | 2 | 3 | 4;
  guess: string;
}

export interface Action {
  type: "check" | "add";
  letter: string;
}
