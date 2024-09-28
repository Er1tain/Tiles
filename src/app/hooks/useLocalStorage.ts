export default function useLocalStorage(store_field: "frame_size"|"moves") {

    return store_field == "frame_size" ?  localStorage.getItem("frame_size") : JSON.parse(localStorage.getItem("moves") || "{}");
}