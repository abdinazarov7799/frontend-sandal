import {create} from "zustand";


const useRequests = create((set) =>({
    requests: [],
    setRequests: (requests) => set(state => ({...state, requests})),
}))

export default useRequests;
