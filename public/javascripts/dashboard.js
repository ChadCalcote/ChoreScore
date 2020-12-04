import { fetchListData } from './fetchLists.js';
import { refreshDashboard } from './refreshDashboard.js';
import { loadChores } from './loadChores'
import { submitChores } from './submitChores'
import { submitList } from '.submitList'

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
