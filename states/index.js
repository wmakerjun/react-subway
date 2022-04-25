import { atom } from "recoil";

const apiUrlState = atom({
  key: "apiUrlState",
  default: "http://localhost:8080",
});

const snackbarState = atom({
  key: "snackbarState",
  default: false,
});

export { apiUrlState, snackbarState };
