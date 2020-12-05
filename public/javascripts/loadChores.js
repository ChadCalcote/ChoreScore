const loadChores = async (data, id) => {
    let choreBox = document.querySelector('.dashboard-column-2__chore-items');
        choreBox.innerHTML= "";
    const res = await fetch('/lists');
    const lists = await res.json();
    const arrayChores = lists.lists;
    // const choreArr2 = lists.lists
    // const choreNames = []
    // choreArr2.forEach((chore)=>{
    //   choreNames.push({"choreName": chore.Chores.choreName, "listId": chore.listId})
    //   console.log(choreNames)
    // })

    const choreContainer = document.querySelector('.dashboard-grid-container__dashboard-column-2');
    arrayChores.forEach((list) => {
      if (list.id === id) {
        list.Chores.forEach((chore)=>{
        const newChore = document.createElement("p");
        newChore.className = "individual-chore-name";
        newChore.appendChild(document.createTextNode(chore.choreName));
        choreContainer.appendChild(newChore);
        choreBox.appendChild(choreContainer);
        });
      }
    });
}

export default loadChores;
