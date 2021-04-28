import { createQuestions } from "../questions/create-questions.js";
import { createGame } from "../questions/create-game.js";
import { hljs } from "./hl.js";

export const generatePage = () => {
  const questions = createQuestions();

  const main = document.querySelector("main");
  main.innerHTML = questions;

  const game_btn = document.querySelector("#game_btn");
  game_btn.onclick = () => createGame();

  hljs(globalThis);
};
