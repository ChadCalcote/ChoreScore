import {
  loadLists,
  refreshDashboard, 
  submitListForm,
  submitChoreForm,
  clearColumn3
} from "./publicUtils.js";

document.addEventListener("DOMContentLoaded", async () => {
  // fetch user data: id, name, lists, chores
  const data = await loadLists();

  // display lists
  refreshDashboard(data);

  // handle create list
  const list = document.querySelector(".dashboard-col-1__new-list-form");
  list.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitListForm();
    const data = await loadLists();
    list.reset();
    refreshDashboard(data);
  });

  const chores = document.querySelector(".chore-form");
  chores.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitChoreForm();
    const data = await loadLists();
    chores.reset();
    document.querySelector(".modal").classList.add("hidden");
  });

    // clearColumn3();
});
