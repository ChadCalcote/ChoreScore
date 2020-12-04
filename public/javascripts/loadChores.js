export const loadChores = async (id) => {
    const res = await fetch("/lists/"+id);
    const data = await res.json();
}
