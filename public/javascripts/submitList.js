import { loadLists, refreshDashboard } from "./publicUtils.js";

const submitListForm = async () => {
  // get form data
  const form = document.querySelector(".dashboard-col-1__new-list-form");
  let formData = new FormData(form);
  const listName = formData.get("listName");

  try {
    // post form
    const res = await fetch("/lists/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listName }),
    });

    // refresh dashboard
    const data = await loadLists();
    refreshDashboard(data);

    // display errors
    const errorsData = await res.json();
    errorsData.listErrors.forEach((error) => {
      const li = document.createElement('li');
      li.innerHTML = error;
      document.querySelector('.dashboard-col-1__errors').appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
};

export default submitListForm;
