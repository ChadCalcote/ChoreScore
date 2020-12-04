document.addEventListener("DOMContentLoaded", async () => {
console.log("hi!");

    loadDashboard();
    attachChore();

    const list = document.querySelector(".list-form")
    list.addEventListener("submit", async (event) => {
            event.preventDefault();
            submitListForm();
            const data = await fetchListData();
            refreshDashboard(data);
    });

    const chores = document.querySelector(".chore-form")
    chores.addEventListener("submit", async (event) => {
            event.preventDefault();
            submitChoreForm();
            const data = await fetchListData();
            refreshDashboard(data);
    });

});
let loadDashboard = async () => {
    try {
        const data = await fetchListData();
        refreshDashboard(data);
    } catch(err) {
        console.error(err);
    }
}

let refreshDashboard = (data) => {
    let formBox = document.querySelector('.dashboard-column-1__individual-items');
        formBox.innerHTML="";
    // Reset its contents to empty string (or else you're going to keep adding the whole array every time)
        const newListContainer = document.createElement('div');
        // give that div a class (for styling and reference purposes)
        newListContainer.className ='form-container';
        // create a new paragraph tag
        data.lists.forEach((listItem) => {
            const newList = document.createElement('p');
            newList.className = "individual-list-item"
        // append a new textNode to the newly created p tag
            newList.appendChild(document.createTextNode(listItem.listName));
            newListContainer.appendChild(newList);
            // create a delete button (bonus)
            formBox.appendChild(newListContainer);
        });
}


let submitListForm = async() => {

    const form = document.querySelector(".list-form");
    let formData = new FormData(form);

    const listName = formData.get("listName");
    try {
        const res = await fetch('/lists/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({listName})
        });
        const data = await fetchListData();

        refreshDashboard(data);
    } catch(err) {
        console.error(err);
    }
}

let submitChoreForm = async() => {

    const form = document.querySelector(".chore-form");
    let formData = new FormData(form);

    const {choreName, value, note, dueDate, choreTypeId, listId } = formData.get("choreName", "value", "note", "dueDate", "choreTypeId", "listId");
    console.log([...formData]);

    try {
        const res = await fetch('/chores/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({choreName, value, note, dueDate, choreTypeId, listId })
        });
        const data = await fetchListData();

        //refreshDashboard(data);
    } catch(err) {
        console.error(err);
    }
}

fetchListData = async () => {
    const res = await fetch('/users/user');
    const data = await res.json();
    return data;
}

attachChore = async () => {
    const data = await fetchListData();
    let individualChores = document.querySelectorAll('.individual-list-item');
    individualChores.forEach((chore) => chore.addEventListener("click", async () => {
        let middleColumn = document.querySelector('.dashboard-grid-container__dashboard-column-2');
        middleColumn.innerHTML="";
    // Reset its contents to empty string (or else you're going to keep adding the whole array every time)
        const newChoreContainer = document.createElement('div');
        // give that div a class (for styling and reference purposes)
        newChoreContainer.className ='chore-container';
        // create a new paragraph tag
        data.chores.forEach((choreItem) => {
            const newChore = document.createElement('p');
            newChore.className = "individual-chore-item"
        // append a new textNode to the newly created p tag
            newChore.appendChild(document.createTextNode(choreItem.choreName));
            newChoreContainer.appendChild(newChore);
            // create a delete button (bonus)
            middleColumn.appendChild(newChoreContainer);

    });
    }));

}
