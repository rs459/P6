// factory
export const createButtonEdit = () => {
  const elEdit = document.createElement("button");
  elEdit.id = "button-edit";
  elEdit.innerHTML = `<i class="fa-regular fa-pen-to-square" aria-hidden="true"></i>Modifier`;
  return elEdit;
};


export const createBanner = () => {
  const elBanner = document.createElement("div");
  elBanner.innerHTML = `<p class="admin-banner">
    <i class="fa-regular fa-pen-to-square" aria-hidden="true"></i>Mode édition
    </p>`;
  return elBanner;
};

export const generateImg = (works) => {
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
