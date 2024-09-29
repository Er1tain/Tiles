import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { Move } from "../store/store";

const GameFrameContext = createContext<[Move, Dispatch<SetStateAction<Move>>]|null>(null);

export const GameFrameProvider = ({children}: any) => {
    const [move, setMove] = useState<Move>({
        1: "", 2: "", result: false
    });

    return (
        <GameFrameContext.Provider value={[move, setMove]}>
            {children}
        </GameFrameContext.Provider>
    
    );
}

export const useGameFrameContext = ()=>useContext(GameFrameContext);