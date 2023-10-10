// factory

//-----------------MAIN UI-----------------
export const generateImg = (works) => {
  return works
    .map((work) => {
      return `
      <figure>
        <img src='${work.imageUrl}' alt='${work.title}'>
        <figcaption>${work.title}</figcaption>
      </figure>`;
    })
    .join("");
};

export const generateFilters = (categories) => {
  const start = `
  <input type="radio" class="visually-hidden" name="category" id="cat-0" value="0" checked>
  <label for="cat-0">Tous</label>`;

  const filtersToRender = categories
    .map((category) => {
      return `
        <input type="radio" class="visually-hidden" name="category" id="cat-${category.id}" value="${category.id}">
        <label for="cat-${category.id}">${category.name}</label>
      `;
    })
    .join("");

  return start + filtersToRender;
};

//-----------------ADMIN UI-----------------
// create button edit
export const createButtonEdit = () => {
  const elEdit = document.createElement("button");
  elEdit.id = "button-edit";
  elEdit.innerHTML = `<i class="fa-regular fa-pen-to-square" aria-hidden="true"></i>Modifier`;
  return elEdit;
};
// create banner
export const createEditionBanner = () => {
  const elBanner = document.createElement("p");
  elBanner.classList.add("admin-banner");
  elBanner.innerHTML = `
    <i class="fa-regular fa-pen-to-square" aria-hidden="true"></i>Mode édition
    `;
  return elBanner;
};

//-----------------DIALOG UI-----------------
export const createDialog = (categories) => {
  const elDialog = document.createElement("dialog");

  //create option for select
  const elsSelect = categories
    .map((option) => {
      return `<option value="${option.id}">${option.name}</option>`;
    })
    .join("");

  //create dialog itself
  elDialog.id = "main-dialog";
  elDialog.innerHTML = `
  <div class="dialog-container">
    <button class="close-dialog">
    <i class="fa-solid fa-xmark" aria-hidden="true"></i>
    <span class="visually-hidden">Fermer la fenêtre modale</span>
    </button>
    <div class="notification" aria-live="assertive" role="alert">
    </div>
    <div class="dialog-page--1">
      <div class="dialog-content">
        <h1>Galerie photo</h1>
        <div id="dialog-gallery">
        </div>
        <hr/>
        <button class="add-item" type="button">
        Ajouter une photo
        </button>
      </div>
    </div>
    <div class="dialog-page--2">
      <button class="back-dialog">
        <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
        <span class="visually-hidden">Retour à la page suppression</span>
      </button>
      <div class="dialog-content">
        <h1>Ajout photo</h1>
        <form id="form-add-item">
          <div class="image-preview">
            <input class="visually-hidden" type="file" name="image" id="image" accept="image/png, image/jpeg" required>
            <label for="image">
              <p><i class="fa-regular fa-image" aria-hidden="true"></i></p>
              <p class="fake-btn">+ Ajouter photo</p>
              <p class="format-indication">png, jpg : 4mo max</p>
            </label>
          </div>
          <p>
            <label for="title">Titre</label>
            <input type="text" name="title" id="title" required>
          </p>
          <p>
            <label for="category">Catégorie</label>
            <select name="category" id="category" required>
              <option value="" disabled selected></option>
              ${elsSelect}
            </select>
          </p>
          <hr/>
          <button id="add-picture" type="submit" disabled="true">
          Valider
          </button>
        </form>
      </div>
    </div>
  </div>
  `;
  return elDialog;
};

// dialog gallery
export const createDialogGallery = (items) => {
  return items
    .map((item) => {
      return `
      <figure id="item-${item.id}">
        <img src="${item.imageUrl}" alt="${item.title}">
        <button class="delete-item" data-item-id="${item.id}" type="button">
          <i class="fa-solid fa-trash-can"></i>
          <span class="visually-hidden">effacer ${item.title}</span>
        </button>
      </figure>
    `;
    })
    .join("");
};
