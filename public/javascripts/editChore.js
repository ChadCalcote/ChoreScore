import loadChores from "./loadChores.js";

const editChore = async (div, typeId) => {

  console.log('edit chore called');
  //document.querySelector(".edit-chore__form").reset();
  document.querySelector(".chore-info__edit").addEventListener("click", async()=>{

    let data = await fetch(`/chores/${div}`)
    let chore = await data.json()

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

    // const choreType = document.getElementById("edit__type");
    // const listId = document.getElementById("edit__list");

    // document.getElementById("edit__name").value = chore.choreName;
    // document.getElementById("edit__due").value = chore.dueDate;
    // document.getElementById("edit__note").value = chore.note;
    // document.getElementById("edit__point").value = chore.point;
    // choreType.options[choreType.selectedIndex].value = chore.choreTypeId;
    // listId.options[listId.selectedIndex].value = chore.listId;
    // console.log('listId', listId.options[listId.selectedIndex].value);

    //const refreshListId = choreList.options[choreList.selectedIndex].value = chore.choreList;;

    const choreInfoContainer = document.querySelector(".chore-info__container")
    choreInfoContainer.classList.add("hidden");
    choreInfoContainer.innerHTML="";

    const choreEditForm = document.querySelector(".edit-chore__form")
    choreEditForm.classList.remove("hidden");

    const choreSaveButton = document.querySelector(".chore__buttons-container")
    choreSaveButton.classList.remove("hidden");

    // choreSaveButton.addEventListener("click", async () => {

      // const choreName = document.getElementById("edit__name").value
      // const dueDate = document.getElementById("edit__due").value
      // const note = document.getElementById("edit__note").value
      // const choreTypeId = choreType.options[choreType.selectedIndex].value;
      // const value = document.getElementById("edit__type").value;
      // const listIdValue = listId.options[listId.selectedIndex].value;
      // const selectedListOption = document.getElementById(chore.listId);
      // const selectedTypeOption = document.getElementById(typeId);



    // Handle save button
    choreSaveButton.addEventListener("click", async () => {
      const choreName = document.getElementById("edit__name").value
      const dueDate = document.getElementById("edit__due").value
      const note = document.getElementById("edit__note").value
      const choreTypeId = choreType.value;
      const value = document.getElementById("edit__type").value;
      const listIdValue = choreList.value;
      // const choreTypeId = choreType.options[choreType.selectedIndex].value;
      // const listIdValue = listId.options[listId.selectedIndex].value;
      // console.log("name", choreName);
      // console.log(listId);
      // console.log(‘choretypeid’, choreTypeId);
      // console.log(‘value’, document.getElementById("edit__name").value)
      try {
        const saveChore = await fetch(`/chores/${div.toString()}/edit`, {
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
        //console.log(saveChore);
        const choreData = await saveChore.json();
        console.log(choreData);
        loadChores(choreData.chore.listId);
        // document.querySelector(".edit-chore__form").reset();
      } catch(e) {
        console.log(e);
      }
  });
// });
  });
}

export default editChore;
