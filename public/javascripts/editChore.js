
import loadChores from "./loadChores.js";

const editChore = async (div) => {
  document.querySelector(".edit-chore__form").reset();
  document.querySelector(".chore-info__edit").addEventListener("click", async()=>{


    let data = await fetch(`/chores/${div}`)
    let chore = await data.json()

    const choreType = document.getElementById("edit__list");
    const listId = document.getElementById("edit__type");

    document.getElementById("edit__name").value = chore.choreName;
    document.getElementById("edit__due").value = chore.dueDate;
    document.getElementById("edit__note").value = chore.note;
    document.getElementById("edit__point").value = chore.point;
    choreType.options[choreType.selectedIndex].value = chore.choreTypeId;
    listId.options[listId.selectedIndex].value = chore.listId;

    const refreshListId = listId.options[listId.selectedIndex].value = chore.listId;;

    const choreInfoContainer = document.querySelector(".chore-info__container")
    choreInfoContainer.classList.add("hidden");
    choreInfoContainer.innerHTML="";

    const choreEditForm = document.querySelector(".edit-chore__form")
    choreEditForm.classList.remove("hidden");

    const choreSaveButton = document.querySelector(".chore__buttons-container")
    choreSaveButton.classList.remove("hidden");

    choreSaveButton.addEventListener("click", async () => {

      const choreName = document.getElementById("edit__name").value
      const dueDate = document.getElementById("edit__due").value
      const note = document.getElementById("edit__note").value
      const choreTypeId = choreType.options[choreType.selectedIndex].value;
      const value = document.getElementById("edit__type").value;
      const listIdValue = listId.options[listId.selectedIndex].value;
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
        const newChoreData = await saveChore.json();
        console.log('new data', newChoreData);
        //loadChores()
        const getChoreData = await fetch(`/lists/${newChoreData.chore.listId.toString()}`);
        const listChores = await getChoreData.json();
        console.log('listchores',listChores);
        console.log(listChores, refreshListId);
        console.log('listId:', newChoreData.chore.listId);
        loadChores(listChores, refreshListId);
        document.querySelector(".edit-chore__form").reset();
      } catch(e) {
      }
    });
  });
}

export default editChore;
