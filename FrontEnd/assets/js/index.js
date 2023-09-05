import { getWorks } from "./services.js";

const elGallery = document.querySelector(".gallery");

// get all works and render them
const works = await getWorks();
let projectsToRender = "";
for (const work of works) {
  projectsToRender += `
  		<figure>
			<img src='${work.imageUrl}' alt='${work.title}'>
			<figcaption>${work.title}</figcaption>
		</figure>`;
}

elGallery.innerHTML = projectsToRender;
