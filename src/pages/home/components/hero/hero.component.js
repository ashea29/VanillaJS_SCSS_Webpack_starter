import "./hero.component.scss";
import { render } from "lit-html";
import HeroTemplate from "./hero.template";

class Hero {
  //   init() {
  //     const renderTarget = document.querySelector(".container");
  //     render(HeroTemplate, renderTarget);
  //   }
  template = HeroTemplate;
  // renderTarget = document.querySelector(".container");

  init() {
    // const el = document.createElement("h1");
    // el.innerHTML = "Vanilla JS & Scss";
    // const containerEl = document.querySelector(".container");
    // containerEl.appendChild(el);
    const renderTarget = document.querySelector(".container");
    render(this.template, renderTarget);
    // render(this.template, this.renderTarget);
  }
}

export default Hero;