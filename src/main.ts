import "./style.css";
import typescriptLogo from "./typescript.svg";
import { setupCounter } from "../lib/main";
import "../lib/headless-tabs";
import "../lib/shadcn-tabs";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

// class MyTabs extends HTMLElement {
//   public connectedCallback() {
//     console.log("my tabs connected");
//     this._setup();
//     this.addEventListener("click", this._handleClick);
//   }

//   public disconnectedCallback() {
//     console.log("my tabs disconnected");
//     this.removeEventListener("click", this._handleClick);
//   }

//   private _setup() {
//     this.style.width = "100px";
//     this.style.height = "100px";
//     this.style.backgroundColor = "red";
//     this.style.display = "flex";
//   }

//   private _handleClick() {
//     console.log("my tabs clicked");
//   }
// }

// customElements.define("my-tabs", MyTabs);

// Ref 后缀代表着 1 份引用，或者说一份恒定的内存指针
// const appRef = document.getElementById("app") as HTMLDivElement;

// const headlessTabs = document.createElement("headless-tabs");

// appRef.append(headlessTabs);

// headlessTabs.remove();
