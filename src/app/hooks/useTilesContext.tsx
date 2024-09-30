import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

let Context: React.Context<Dispatch<SetStateAction<React.MutableRefObject<Dispatch<SetStateAction<string>>>[]>> | null>= createContext<Dispatch<SetStateAction<React.MutableRefObject<Dispatch<SetStateAction<string>>>[]>>|null>(null);

//Контекст для манипуляций с плитками и хук для его использования
export default function TilesContextProvider({children}: any) {
    const [list, setList] = useState<
        React.MutableRefObject<Dispatch<SetStateAction<string>>>[]
        >([]);

    return (
        <Context.Provider value={setList}>
            {children}
        </Context.Provider>
    );

}

export const useTilesContext = useContext(Context);

