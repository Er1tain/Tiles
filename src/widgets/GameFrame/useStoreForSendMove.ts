import { useDispatch } from "react-redux";
import { ChoiceTilesType } from "./types";
import { useEffect } from "react";
import { addMove, Move } from "../../app/store/store";
import { initStateChoiceTiles } from "./GameFrame";

export default function useStoreForSendMove([choice_tiles, setChoiceTiles]: [ChoiceTilesType, React.Dispatch<React.SetStateAction<ChoiceTilesType>>]) {
    const dispatch = useDispatch();
    useEffect(()=>{
        if (choice_tiles?.first_tiles.color_tiles != "" && choice_tiles?.second_tiles.color_tiles != "") {
            
            //Отправляем в store ход в соответствии с типом данных Move
            const move: Move = {
                1: choice_tiles.first_tiles.coords,
                2: choice_tiles.second_tiles.coords,
                result: choice_tiles.first_tiles.color_tiles == choice_tiles.second_tiles.color_tiles
            }
            dispatch(addMove(move));

            if (choice_tiles?.first_tiles.color_tiles != "" && choice_tiles?.second_tiles.color_tiles != "") setChoiceTiles(initStateChoiceTiles);
        }
    }, [choice_tiles])
}