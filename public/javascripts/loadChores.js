import loadChoreInfo from "./loadChoreInfo.js"
import clearColumn3 from "./clearColumn3.js"

const loadChores = async (id) => {
  clearColumn3();
  const res = await fetch(`/lists/${id.toString()}`);
  const list = await res.json();

  const chores = list.chores;

  const choreContainer = document.querySelector(".chore-container");
  choreContainer.innerHTML = ""; // Clear choreContainer

  chores.forEach((chore) => {
    const newChore = document.createElement("p");
    newChore.className = "individual-chore-name";

    newChore.appendChild(document.createTextNode(chore.choreName));
    choreContainer.appendChild(newChore);
    document.querySelector(".edit-chore__form").reset();
    newChore.addEventListener("click", ()=>{
      console.log("load chore info event listener")
      const id = chore.id;
      loadChoreInfo(id);
    })
  });
};

export default loadChores;
