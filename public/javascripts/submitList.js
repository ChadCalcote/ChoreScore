import fetchListData from './fetchLists.js';
import refreshDashboard from './refreshDashboard.js';
export const submitListForm = async() => {

    const form = document.querySelector(".list-form");
    let formData = new FormData(form);

    const listName = formData.get("listName");
    try {
        const res = await fetch('/lists/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({listName})
        });
        const data = await fetchListData(); //
        console.log(data);

        refreshDashboard(data);
    } catch(err) {
        console.error(err);
    }
}
