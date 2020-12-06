import loadChores from "./loadChores.js";
import { fetchListData } from "./publicUtils.js";
const submitChoreForm = async () => {
  const form = document.querySelector(".chore-form");
  let formData = new FormData(form);
  const choreName = formData.get("choreName");
  const value = formData.get("value");
  const note = formData.get("note");
  const dueDate = formData.get("dueDate");
  const choreTypeId = formData.get("choreTypeId");
  const listId = formData.get("listId");

  try {
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
    const data = await fetchListData();
    loadChores(data, listId)

    //refreshDashboard(data);
  } catch (err) {
    console.error(err);
  }
};

export default submitChoreForm;
