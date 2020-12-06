const addChoreButton = document.querySelector(".chore-container__modal-button");

addChoreButton.addEventListener("click", () => {
    document.querySelector(".modal").classList.remove("hidden");
});

const closeModal = document.querySelector(".modal__close");
closeModal.addEventListener("click", () => {
    document.querySelector(".modal").classList.add("hidden");
})
