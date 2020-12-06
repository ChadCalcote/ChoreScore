

document.querySelector(".chore-info__edit").addEventListener("click", async()=>{
  const div = document.querySelector(".id__info").innerHTML
  let data = await fetch(`/chores/${div}`)
  let chore = await data.json()

  document.getElementById("edit__name").value = chore.choreName
  document.getElementById("edit__due").value = chore.dueDate
  document.getElementById("edit__note").value = chore.note
  document.getElementById("edit__point").value = chore.point

  const choreInfoContainer = document.querySelector(".chore-info__container")
  choreInfoContainer.classList.add("hidden");
  choreInfoContainer.innerHTML="";

  const choreEditForm = document.querySelector(".edit-chore__form")
  choreEditForm.classList.remove("hidden");

  const choreSaveButoon = document.querySelector(".chore__buttons-container")
  choreSaveButoon.classList.remove("hidden");
})
