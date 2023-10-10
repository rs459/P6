import { getWorks, getCategories } from "./services.js";
import { generateImg, generateFilters } from "./factory.js";

const elLegend = document.querySelector("#filter-categories > fieldset");
const filters = generateFilters(await getCategories());
const p = document.createElement("p");
p.innerHTML = filters;
elLegend.append(p);

// get all works and render them, apply filter if needed
const renderWork = async (categoryToFilter = 0) => {
  const elGallery = document.querySelector(".gallery");
  const works = await getWorks();

  //filter if needed
  const filteredworks = works.filter((work) => {
    if (categoryToFilter !== 0) {
      return work.categoryId === categoryToFilter;
    } else {
      return true;
    }
  });

  //render
  elGallery.innerHTML = generateImg(filteredworks);
};

// listen for work-updated event for re-rendering the gallery
document.addEventListener("work-updated", () => {
  // get the current category filter
  const currentFilter = +document.querySelector(
    'input[name="category"]:checked'
  ).value;
  // re-render the gallery
  renderWork(currentFilter);
});

// initial render
renderWork();

// filter the gallery
const elFilters = document.querySelector("#filter-categories");
elFilters.addEventListener("change", ({ target }) => renderWork(+target.value));
