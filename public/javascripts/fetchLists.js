export const fetchListData = async () => {
        const res = await fetch('/users/user');
        const data = await res.json();
        return data;
    }
