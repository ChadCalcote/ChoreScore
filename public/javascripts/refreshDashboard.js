import { loadChores } from "./publicUtils.js";
import loadUnassignedChores from "./loadUnassignedChores.js";


const refreshDashboard = async (data) => {
  let formBox = document.querySelector(".dashboard-column-1__lists");
  formBox.innerHTML = ""; // Clear formBox

  const newListContainer = document.createElement("div");
  newListContainer.className = "form-container";

  const unassignedTasks = document.querySelector('.dashboard-column-1__unassigned-tasks')
  unassignedTasks.addEventListener("click", async () => {
    loadUnassignedChores(data);
  })
  // const newChoreContainer = document.createElement('div');
  // newChoreContainer.className ='chore-container';

  // create a new paragraph tag
  data.lists.forEach((listItem) => {
    const newList = document.createElement("p");
    newList.className = "individual-list-item";

    newList.appendChild(document.createTextNode(listItem.listName));
    newListContainer.appendChild(newList);
    formBox.appendChild(newListContainer);

    newList.addEventListener("click", () => {
      const id = listItem.id;
      loadChores(data, id);
    });
    })

}

export default refreshDashboard;
