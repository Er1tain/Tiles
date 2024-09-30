import { useDispatch, useSelector } from "react-redux";
import { ChoiceTilesType } from "./types";
import { useEffect } from "react";
import { addMove, beginNewRound, FrameSize, Move, TypeState } from "../../app/store/store";
import { initStateChoiceTiles } from "./GameFrame";
import blockedTiles from "./blockedTiles";

export default function useStoreForSendMove([choice_tiles, setChoiceTiles]: [ChoiceTilesType, React.Dispatch<React.SetStateAction<ChoiceTilesType>>]) {
    const size = Number((useSelector<TypeState>(state => state.frame_size) as FrameSize)[0]);

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

            if (choice_tiles?.second_tiles.color_tiles != "") setChoiceTiles(initStateChoiceTiles);

            choice_tiles.first_tiles.color_tiles == choice_tiles.second_tiles.color_tiles ? blockedTiles(choice_tiles, size) : dispatch(beginNewRound());
        }
    }, [choice_tiles, dispatch, setChoiceTiles])
}