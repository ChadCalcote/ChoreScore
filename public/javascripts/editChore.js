document.querySelector(".chore-info__edit").addEventListener("click", async()=>{
  const div = document.querySelector(".id__info").innerHTML

  let data = await fetch(`/chores/${div}`)
  let chore = await data.json()

document.getElementById("edit__name").value = chore.choreName;
document.getElementById("edit__due").value = chore.dueDate;
document.getElementById("edit__note").value = chore.note;
document.getElementById("edit__point").value = chore.point;
const choreType = document.getElementById("edit__list");
const listId = document.getElementById("edit__type");

choreType.options[choreType.selectedIndex].value = chore.choreTypeId;
listId.options[listId.selectedIndex].value = chore.listId;

console.log("Initial value", choreType.options[choreType.selectedIndex].value)
console.log("Initial list value", listId.options[listId.selectedIndex].value)

document.getElementById("edit__type").value = chore.listId;

  const choreInfoContainer = document.querySelector(".chore-info__container")
  choreInfoContainer.classList.add("hidden");
  choreInfoContainer.innerHTML="";

  const choreEditForm = document.querySelector(".edit-chore__form")
  choreEditForm.classList.remove("hidden");

  const choreSaveButton = document.querySelector(".chore__buttons-container")
  choreSaveButton.classList.remove("hidden");

  const choreEditButton = document.querySelector(".chore-info__edit");

  choreSaveButton.addEventListener("click", async () => {
    console.log('click');

    const choreName = document.getElementById("edit__name").value
    const dueDate = document.getElementById("edit__due").value
    const note = document.getElementById("edit__note").value
    const choreTypeId = choreType.options[choreType.selectedIndex].value;
    const value = document.getElementById("edit__type").value;
    const listIdValue = listId.options[listId.selectedIndex].value;
    console.log("name", choreName);
    console.log(listId);
    console.log('choretypeid', choreTypeId);
    console.log('value', document.getElementById("edit__name").value)
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
    } catch(e) {

    }
    choreEditButton.classList.add("hidden");
  });
})
