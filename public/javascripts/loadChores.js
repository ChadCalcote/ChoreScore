const loadChores = async (data, id) => {
  const res = await fetch(`/lists/${id.toString()}`);
  const list = await res.json();

  const chores = list.chores;

  console.log(list.chores)

  const choreContainer = document.querySelector('.chore-container');
  choreContainer.innerHTML=""; // Clear choreContainer

  chores.forEach((chore) => {
    const newChore = document.createElement("p");
    newChore.className = "individual-chore-name";

    newChore.appendChild(document.createTextNode(chore.choreName));
    choreContainer.appendChild(newChore);
  });
}

export default loadChores;
