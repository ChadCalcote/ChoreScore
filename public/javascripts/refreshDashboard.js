const loadChores = require('./loadChores')

export const refreshDashboard = async (data) => {
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

            const newList = document.createElement('p');
            newList.className = "individual-list-item"

            newList.appendChild(document.createTextNode(listItem.listName));
            newListContainer.appendChild(newList);
            formBox.appendChild(newListContainer);

            const lists = document.querySelectorAll('.individual-list-item');
            lists.forEach((list) => addEventListener("click", () => {
                const id = listItem.id;
                console.log(id);
                loadChores(id);
            })
        );
        });
    }
