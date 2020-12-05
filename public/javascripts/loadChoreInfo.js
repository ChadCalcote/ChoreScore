const loadChores = async (data, id) => {
  const res = await fetch(`/chores/${id.toString()}`);
  const chore = await res.json();

  const chores = list.chores;

  const choreContainer = document.querySelector('.chore-container');
  choreContainer.innerHTML=""; // Clear choreContainer
  
  chores.forEach((chore) => {
    const newChore = document.createElement("p");
    newChore.className = "individual-chore-name";

    newChore.appendChild(document.createTextNode(chore.choreName));
    choreContainer.appendChild(newChore);

    newChore.addEventListener("click", ()=>{
      const id = chore.id;
      loadChoreInfo(data, id);
    })
  });
}

export default loadChores;

