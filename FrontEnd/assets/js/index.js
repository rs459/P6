import { getWorks } from "./services.js";

const generateImage = (works) => {
  let projectsToRender = "";
  for (const work of works) {
    projectsToRender += `
  	<figure>
			<img src='${work.imageUrl}' alt='${work.title}'>
			<figcaption>${work.title}</figcaption>
		</figure>`;
  }

  return projectsToRender;
};

// get all works and render them, apply filter if needed
const renderWork = async (categoryToFilter = 0) => {
  const elGallery = document.querySelector(".gallery");
  const works = await getWorks();

  //filter if needed
  const filteredworks = works.filter((work) => {
    if (categoryToFilter !== 0) {
      return work.categoryId === categoryToFilter;
    } else {
      return work;
    }
  });

  //render
  elGallery.innerHTML = generateImage(filteredworks);
};

renderWork();

const elFilters = document.querySelector("#filter-categories");
elFilters.addEventListener("change", ({ target }) => renderWork(+target.value));
