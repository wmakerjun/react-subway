import { atom } from "recoil";

const apiUrlState = atom({
  key: "apiUrlState",
  default: "http://localhost:8080",
});

export { apiUrlState };
