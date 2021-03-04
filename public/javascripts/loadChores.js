import loadChoreInfo from "./loadChoreInfo.js"
import clearColumn3 from "./clearColumn3.js"

const loadChores = async (id) => {
  // clearColumn3();
  const res = await fetch(`/lists/${id.toString()}`);
  const list = await res.json();

  const chores = list.chores;

  const choresContainer = document.querySelector(".dashboard-col-2__chores-container");
  choresContainer.innerHTML = ""; // Clear choreContainer

  chores.forEach((chore) => {
    const choreContainer = document.createElement('div');
    choreContainer.className = 'dashboard-col-2__chore-container';

    const checkbox = document.createElement('span');
    checkbox.className = 'far fa-square dashboard-col-2__chore-checkbox-icon';

    const newChore = document.createElement("p");
    newChore.className = "dashboard-col-2__chore-name";
    newChore.appendChild(document.createTextNode(chore.choreName));

    choreContainer.appendChild(checkbox);
    choreContainer.appendChild(newChore);
    choresContainer.appendChild(choreContainer);

    document.querySelector(".edit-chore__form").reset();
    choreContainer.addEventListener("click", ()=>{
      const id = chore.id;
      loadChoreInfo(id); 
    }) 
  });
};

export default loadChores;
