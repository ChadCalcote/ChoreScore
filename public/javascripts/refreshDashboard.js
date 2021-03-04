import { loadChores } from "./publicUtils.js";
import loadUnassignedChores from "./loadUnassignedChores.js";


const refreshDashboard = (data) => {
  // container of all lists
  let listsContainer = document.querySelector(".dashboard-col-1__lists");
  listsContainer.innerHTML = "";

  // container of unassigned tasks list
  const unassignedTasks = document.querySelector('.dashboard-col-1__unassigned-tasks')
  unassignedTasks.addEventListener("click", async () => {
    loadUnassignedChores(data);
  })

  // container of each list
  data.lists.forEach((list) => {
    //----create container
    const eachList = document.createElement("p");
    eachList.className = "dashboard-col-1__list";
    eachList.appendChild(document.createTextNode(list.listName));

    //----append to parent container
    listsContainer.appendChild(eachList);

    //----add load chore listener
    eachList.addEventListener("click", () => {
      const id = list.id;
      loadChores(id);
    });
  })
}

export default refreshDashboard;
