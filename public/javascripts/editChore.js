import loadChores from "./loadChores.js";

const editChore = async (choreId, typeId) => {
  document.querySelector(".edit-chore__form").reset();

  // Clear edit button container
  const editButtonContainer = document.querySelector(".chore-info__edit-container");
  editButtonContainer.innerHTML = "";

  // Create a new edit button
  const editButton = document.createElement("button");
  editButton.innerText = "Edit"
  editButton.classList.add("chore-info__edit");
  
  // Append edit button to container
  editButtonContainer.appendChild(editButton);
  
  // Add event listener to edit button
  editButton.addEventListener("click", async()=>{
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

    // Clear save button container
    const saveButtonContainer = document.querySelector(".chore__buttons-container");
    saveButtonContainer.innerHTML = "";

    // Create a new save button
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save"
    saveButton.classList.add("chore__save");
    
    // Append save button to container
    saveButtonContainer.appendChild(saveButton);

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
        // document.querySelector(".edit-chore__form").reset();
      } catch(e) {
        console.log(e);
      }
      // Clear column 3
      document.querySelector(".chore-info__edit-container").innerHTML = "";
    });
  });
} 


export default editChore;
