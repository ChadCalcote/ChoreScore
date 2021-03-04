import {
  loadLists,
  refreshDashboard, 
  submitList,
  submitChore,
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
    await submitList();
    list.reset();
  });

  // handle create chore
  const chore = document.querySelector(".chore-form");
  chore.addEventListener("submit", async (event) => {
    event.preventDefault();
    await submitChore();
  });

  // clearColumn3();
});
