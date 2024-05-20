import { Board, Ship, Player } from "../../utils.js";
import "./style.css";

let ship = new Ship(2, "V", 1, 1);
console.log(ship.length);

const element = document.createElement("div");
element.innerHTML = `${ship.length}`;
element.classList.add("test");
document.body.appendChild(element);
