import loadChores from "./loadChores.js";
import { loadLists, refreshDashboard } from "./publicUtils.js";

const submitChore = async () => {
  // get form data
  const form = document.querySelector(".chore-form");
  let formData = new FormData(form);
  const choreName = formData.get("choreName");
  const value = formData.get("value");
  const note = formData.get("note");
  const dueDate = formData.get("dueDate");
  const choreTypeId = formData.get("choreTypeId");
  const listId = formData.get("listId");

  try {
    // post form
    const res = await fetch("/chores/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        choreName,
        value,
        note,
        dueDate,
        choreTypeId,
        listId,
      }),
    });
    await loadChores(listId)
    form.reset();
    document.querySelector(".modal-wrapper").classList.add("hidden");
    document.querySelector(".modal").classList.add("hidden");
  } catch (err) {
    console.log(res)
  }
};

export default submitChore;
