import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

let Context: any = createContext<any>(null);

//Контекст для манипуляций с плитками и хук для его использования
export default function TilesContextProvider({children}: any) {
    const state_list_refs = useState<
        React.MutableRefObject<Dispatch<SetStateAction<string>>>[]
        >([]);

    return (
        <Context.Provider value={state_list_refs}>
            {children}
        </Context.Provider>
    );

}

export const useTilesContext = ()=>{
    return useContext(Context);
}

