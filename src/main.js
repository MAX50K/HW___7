import Handlebars from "handlebars";
import { products } from "../data.js";

const source = `
{{#each this}}
<div>
  <h3>{{name}}</h3>
  <p>${{price}}</p>
  <p>{{description}}</p>
  <button data-id="{{id}}" class="delete">Delete</button>
</div>
{{/each}}
`;

const template = Handlebars.compile(source);

let items = [...products];

const list = document.querySelector("#list");

function render() {
  list.innerHTML = template(items);
}

render();

document.querySelector("#add").addEventListener("click", () => {
  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const description = document.querySelector("#desc").value;

  items.push({
    id: Date.now(),
    name,
    price,
    description
  });

  render();
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = Number(e.target.dataset.id);
    items = items.filter(p => p.id !== id);
    render();
  }
});