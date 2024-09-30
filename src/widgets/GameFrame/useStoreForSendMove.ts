import { useDispatch, useSelector } from "react-redux";
import { ChoiceTilesType } from "./types";
import { useEffect, useState } from "react";
import { addMove, beginNewRound, FrameSize, Move, TypeState } from "../../app/store/store";
import { initStateChoiceTiles } from "./GameFrame";
import blockedTiles from "./blockedTiles";
import { useNavigate } from "react-router";

export default function useStoreForSendMove([choice_tiles, setChoiceTiles]: [ChoiceTilesType, React.Dispatch<React.SetStateAction<ChoiceTilesType>>]) {
    const size = Number((useSelector<TypeState>(state => state.frame_size) as FrameSize)[0]);

    const [countSameClick, setCountSameClick] = useState<number>(0);

    const dispatch = useDispatch();
    const nav = useNavigate();
    useEffect(()=>{
        if (countSameClick == size * size) nav('/result');
        if (choice_tiles?.first_tiles.color_tiles != "" && choice_tiles?.second_tiles.color_tiles != "") {
            
            //Отправляем в store ход в соответствии с типом данных Move
            const move: Move = {
                1: choice_tiles.first_tiles.coords,
                2: choice_tiles.second_tiles.coords,
                result: choice_tiles.first_tiles.color_tiles == choice_tiles.second_tiles.color_tiles
            }
            dispatch(addMove(move));

            if (choice_tiles?.second_tiles.color_tiles != "") setChoiceTiles(initStateChoiceTiles);

            if (choice_tiles.first_tiles.color_tiles == choice_tiles.second_tiles.color_tiles) {
                blockedTiles(choice_tiles);

                let current_count = countSameClick;
                current_count += 2;
                setCountSameClick(current_count);
            } else dispatch(beginNewRound());
        }
    }, [choice_tiles, dispatch, setChoiceTiles, countSameClick, setCountSameClick])
}