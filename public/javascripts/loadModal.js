const addChoreButton = document.querySelector(".dashboard-col-2__add-chore-button");

addChoreButton.addEventListener("click", () => {
    document.querySelector(".modal-wrapper").classList.remove("hidden");
    document.querySelector(".modal").classList.remove("hidden");
});

const closeModal = document.querySelector(".modal__close");
closeModal.addEventListener("click", () => {
    document.querySelector(".modal-wrapper").classList.add("hidden");
    document.querySelector(".modal").classList.add("hidden");
})
