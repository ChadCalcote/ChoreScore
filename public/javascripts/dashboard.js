document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchListData();
    refreshDashboard(data);

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

fetchListData = async () => {
    const res = await fetch('/users/user');
    const data = await res.json();
    return data;
}

let loadChores = async (id) => {
    const res = await fetch("/lists/"+id.toString());
    const data = await res.json();
   console.log(data);
}

let refreshDashboard = async (data) => {
    let formBox = document.querySelector('.dashboard-column-1__lists');
        formBox.innerHTML="";
    // Reset its contents to empty string (or else you're going to keep adding the whole array every time)
        const newListContainer = document.createElement('div');
        // give that div a class (for styling and reference purposes)
        newListContainer.className ='form-container';

        const newChoreContainer = document.createElement('div');
        // give that div a class (for styling and reference purposes)
        newChoreContainer.className ='chore-container';

        // create a new paragraph tag
        data.lists.forEach((listItem) => {
            const id = listItem.id;
            console.log('ID', id);

            const newList = document.createElement('p');
            newList.className = "individual-list-item"

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
    const choreName = formData.get("choreName");
    const value = formData.get("value");
    const note = formData.get("note");
    const dueDate = formData.get("dueDate");
    const choreTypeId = formData.get("choreTypeId");
    const listId = formData.get("listId");

    try {
        const res = await fetch('/chores/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({choreName, value, note, dueDate, choreTypeId, listId})
        });
        const data = await fetchListData();

        //refreshDashboard(data);
    } catch(err) {
        console.error(err);
    }
}
