import { fetchListData, refreshDashboard } from "./publicUtils.js";
const submitListForm = async () => {
  const form = document.querySelector(".list-form");
  let formData = new FormData(form);

  const listName = formData.get("listName");
  try {
    const res = await fetch("/lists/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listName }),
    });
    const data = await fetchListData();
    refreshDashboard(data);
    const errorsData = await res.json();
      errorsData.listErrors.forEach((error) => {
        const li = document.createElement('li');
        li.innerHTML = error;
        document.querySelector('.dashboard-column-1__errors').appendChild(li);
      });
  } catch (err) {
    console.error(err);
  }
};

export default submitListForm;
