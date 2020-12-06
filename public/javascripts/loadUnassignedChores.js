const loadUnassignedChores = async (data) => {
    let choreArr = []
    const res = await data.chores
    res.forEach((chore)=>{
        if(chore.listId === null){
        choreArr.push(chore)
    }})

    const choreContainer = document.querySelector('.chore-container');
    choreContainer.innerHTML=""; // Clear choreContainer

    choreArr.forEach((chore) => {
      const newChore = document.createElement("p");
      newChore.className = "individual-chore-name";

      newChore.appendChild(document.createTextNode(chore.choreName));
      choreContainer.appendChild(newChore);
    });
  }

  export default loadUnassignedChores;
