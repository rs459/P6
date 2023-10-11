import {
  createButtonEdit,
  createDialog,
  createEditionBanner,
} from "./factory.js";
import { getCategories, uploadWork } from "./services.js";
import { removeItem, updateOrCreateGallery } from "./utils.js";
import { conf } from "../conf/config.js";

// add edit admin UI
document.querySelector("body").classList.add("js-admin");
document.querySelector(".js-is-admin").addEventListener("click", () => {
  localStorage.removeItem("auth");
  location.href = "/";
});
// edit button
const elEdit = createButtonEdit();
document.querySelector("#portfolio h2").append(elEdit);

// banner
const elBanner = createEditionBanner();
document.querySelector("header").prepend(elBanner);

// register event listener for edit button
elEdit.addEventListener("click", async () => {
  // initial render on click
  await updateOrCreateGallery();

  // show the dialog
  elDialog.showModal();
});

// get categories
const categories = await getCategories();

// create dialog with categories
const elDialog = createDialog(categories);

// append dialog to body
document.querySelector("body").append(elDialog);

//close on backdrop click
elDialog.addEventListener("click", (event) => {
  if (event.target.nodeName === "DIALOG") {
    elDialog.close();
  }
});

elDialog.addEventListener("close", () => {
  elDialog.querySelector(".dialog-page--1").style.display = "block";
  elDialog.querySelector(".dialog-page--2").style.display = "none";
});

// close on close button click
const elCloseButton = elDialog.querySelector(".close-dialog");
elCloseButton.addEventListener("click", () => {
  elDialog.querySelector(".dialog-page--1").style.display = "block";
  elDialog.querySelector(".dialog-page--2").style.display = "none";
  elDialog.close();
});

// event delegation
const elDialogGallery = elDialog.querySelector("#dialog-gallery");

elDialogGallery.addEventListener("click", (e) => {
  const target = e.target;
  // I == fontawesome icon
  if (target.tagName == "I") {
    removeItem(target.closest("button").dataset.itemId);
  } else if (target.tagName == "BUTTON") {
    removeItem(target.dataset.itemId);
  }
});

// switch between pages
const elAddPictureButton = elDialog.querySelector(".add-item");
const elBackButton = elDialog.querySelector(".back-dialog");

elAddPictureButton.addEventListener("click", () => {
  elDialog.querySelector(".dialog-page--1").style.display = "none";
  elDialog.querySelector(".dialog-page--2").style.display = "block";
});

elBackButton.addEventListener("click", () => {
  elDialog.querySelector(".dialog-page--1").style.display = "block";
  elDialog.querySelector(".dialog-page--2").style.display = "none";
  elForm.reset();
  messagesError.clear();
  elPicturePreview.querySelectorAll("label p").forEach((p) => {
    p.classList.remove("visually-hidden");
  });
  elPicturePreview.style.backgroundImage = "";
  isFormValid();
});

// upload the image
const elForm = elDialog.querySelector("#form-add-item");
const elFile = elDialog.querySelector("#image");
const elTitle = elDialog.querySelector("#title");
const elCategory = elDialog.querySelector("#category");
const elPicturePreview = elDialog.querySelector(".image-preview label");
const elAddPicture = elDialog.querySelector("#add-picture");
const elNotification = elDialog.querySelector(".notification");

const formSubmitWork = new FormData();

const formState = {
  image: false,
  title: false,
  category: false,
};

const isFormValid = () => {
  if (
    formState.title === true &&
    formState.category === true &&
    formState.image === true
  ) {
    elAddPicture.removeAttribute("disabled");
    elNotification.innerHTML = "";
    elNotification.classList.remove("error");
    return true;
  } else {
    elAddPicture.setAttribute("disabled", true);
    if (messagesError.size > 0) {
      elNotification.classList.add("error");
    }
    elNotification.innerHTML = Array.from(messagesError || "").join("<br/>");
  }
};

const messagesError = new Set();

isFormValid();

// form validation

elFile.addEventListener("input", () => {
  formState.image = true;
  const reader = new FileReader();
  reader.readAsDataURL(elFile.files[0]);
  reader.onload = (e) => {
    elPicturePreview.style.backgroundImage = `url(${e.target.result})`;
    // hide all paragraphs in the label
    elPicturePreview.querySelectorAll("label p").forEach((p) => {
      p.classList.add("visually-hidden");
    });
  };
  isFormValid();
});

elTitle.addEventListener("blur", (event) => {
  const message = conf.error_length_title;
  if (event.target.value.length >= 3) {
    formState.title = true;
    messagesError.delete(message);
  } else {
    messagesError.add(message);
    formState.title = false;
  }
  isFormValid();
});

elCategory.addEventListener("change", (event) => {
  const message = conf.error_category;
  if (event.target.value !== "") {
    formState.category = true;
    messagesError.delete(message);
  } else {
    formState.category = false;
    messagesError.add(message);
  }
  isFormValid();
});

elForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (isFormValid()) {
    formSubmitWork.set("image", elFile.files[0]);
    formSubmitWork.set("title", elTitle.value);
    formSubmitWork.set("category", elCategory.value);

    const response = await uploadWork(formSubmitWork);

    if (response.status === 201) {
      updateOrCreateGallery();
      elForm.reset();
      formState.image = false;
      formState.title = false;
      formState.category = false;
      isFormValid();
      elPicturePreview.style.backgroundImage = "";
      // show all paragraphs in the label
      elPicturePreview.querySelectorAll("label p").forEach((p) => {
        p.classList.remove("visually-hidden");
      });
      // dispatch event to update the main gallery
      document.dispatchEvent(new CustomEvent("work-updated"));
      elNotification.innerHTML = conf.success_upload;
      elNotification.classList.add("success");
      setTimeout(() => {
        elNotification.innerHTML = "";
        elNotification.classList.remove("success");
      }, 2000);
    } else {
      messagesError.add(conf.error_upload, " : ", response.status);
      isFormValid();
    }
  }
});
