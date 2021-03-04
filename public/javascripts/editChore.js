import loadChores from "./loadChores.js";
import loadChoreInfo from "./loadChoreInfo.js";

const editChore = async (choreId, typeId) => {
  // Add event listener to edit button
  const editButton = document.querySelector(".chore-info__edit");
  editButton.addEventListener("click", async()=>{
    // Clear edit button container
    const editButtonContainer = document.querySelector(".chore-info__edit-button-container");
    editButtonContainer.innerHTML = "";

    console.log("edit form event listener")
    let data = await fetch(`/chores/${choreId}`)
    let chore = await data.json()

    // Select chore info container
    const choreName = document.getElementById("edit__name");
    const choreDue = document.getElementById("edit__due");
    const choreNote = document.getElementById("edit__note");
    const chorePoint = document.getElementById("edit__point");
    const choreList = document.getElementById("edit__list");
    const choreType = document.getElementById("edit__type");
    const selectedListOption = document.getElementById(chore.listId);
    const selectedTypeOption = document.getElementById(typeId);

    // Prefilled form with existing data
    choreName.value = chore.choreName;
    choreDue.value = chore.dueDate;
    choreNote.value = chore.note;
    chorePoint.value = chore.point;
    selectedListOption.setAttribute("selected", "selected");
    selectedTypeOption.setAttribute("selected", "selected");

    const choreInfoContainer = document.querySelector(".chore-info__container")
    choreInfoContainer.classList.add("hidden");
    choreInfoContainer.innerHTML="";

    const choreEditForm = document.querySelector(".edit-chore__form")
    choreEditForm.classList.remove("hidden");

    const choreSaveButton = document.querySelector(".chore__buttons-container")
    choreSaveButton.classList.remove("hidden");

    // Create a new save button
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save"
    saveButton.classList.add("chore__save");

    // Create a cancel button
    const cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel"
    cancelButton.classList.add("chore__cancel");

    cancelButton.addEventListener("click", async () => {
      // Reset and hide edit form
      const choreEditForm = document.querySelector(".edit-chore__form")
      choreEditForm.reset();
      choreEditForm.classList.add("hidden");

      // Clear edit button container
      const saveButtonContainer = document.querySelector(".chore__buttons-container");
      saveButtonContainer.innerHTML = "";

      // Load chore
      await loadChoreInfo(choreId);
    })

    // Append save button to container
    const saveButtonContainer = document.querySelector(".chore__buttons-container");
    saveButtonContainer.appendChild(saveButton);
    saveButtonContainer.appendChild(cancelButton);

    // Add event listener to save button
    saveButton.addEventListener("click", async () => {
      const choreName = document.getElementById("edit__name").value
      const dueDate = document.getElementById("edit__due").value
      const note = document.getElementById("edit__note").value
      const choreTypeId = choreType.value;
      const value = document.getElementById("edit__type").value;
      const listIdValue = choreList.value;
      try {
        const saveChore = await fetch(`/chores/${choreId.toString()}/edit`, {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            choreName,
            value,
            dueDate,
            note,
            choreTypeId,
            isCompleted: false,
            listId: listIdValue,
          }),
        });

        const choreData = await saveChore.json();
        loadChores(choreData.chore.listId);
      } catch(e) {
        console.log(e);
      }
      // Clear column 3
      document.querySelector(".chore-info__edit-button-container").innerHTML = "";
    });
  });
} 


export default editChore;
