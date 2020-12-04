const loadChores = async (data, id) => {
    const res = await fetch('/lists');
    const lists = await res.json();
    let choreArray = [];
    const arrayChores = lists.lists[0].Chores;

    const choreContainer = document.querySelector('.dashboard-grid-container__dashboard-column-2');
    arrayChores.forEach((chore) => {
      if (chore.listId === id) {
        const newChore = document.createElement("p");
        newChore.className = "individual-chore-name";

        newChore.appendChild(document.createTextNode(chore.choreName));
        choreContainer.appendChild(newChore);
      }
    });
    // const currentUser = data.userId;
    // return data.chores({ where: { userId: currentUser, listId: id }})
}

// chore.userId = currentUser && chore.listId = id;

export default loadChores;

