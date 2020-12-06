document.querySelector(".chore-info__edit").addEventListener("click", async()=>{
  const choreInfoContainer = document.querySelector(".chore-info__container")
  choreInfoContainer.classList.add("hidden");
  choreInfoContainer.innerHTML="";

  const choreEditForm = document.querySelector(".edit-chore__form")
  choreEditForm.classList.remove("hidden");

  const choreSaveButoon = document.querySelector(".chore__buttons-container")
  choreSaveButoon.classList.remove("hidden");
}) 