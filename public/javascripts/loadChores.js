
export const loadChores = async (id) => {
    const res = await fetch("/lists/"+id.toString());
    const data = await res.json();
    console.log(data)
    return data;
}
