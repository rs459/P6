import { createDialogGallery } from "./factory.js";
import { getWorks, deleteWork } from "./services.js";

// update or create the gallery
export const updateOrCreateGallery = async () => {
  const elDialogGallery = document.querySelector("#dialog-gallery");
  const works = await getWorks();
  elDialogGallery.innerHTML = createDialogGallery(works);
};

// remove item from DB and update gallery / main gallery
export const removeItem = async (itemId) => {
  deleteWork(itemId);
  updateOrCreateGallery();

  // dispatch event to update the main gallery
  document.dispatchEvent(new CustomEvent("work-updated"));
};
