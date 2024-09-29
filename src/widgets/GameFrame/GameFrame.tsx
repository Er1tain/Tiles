import { useState } from "react";
import { COLOR_GAME_FRAME, COLOR_TYPE_TILE_1, COLOR_TYPE_TILE_2 } from "../../shared/COLORS";
import Tiles from "../Tiles";
import { ChoiceTilesType, IGameFrame } from "./types";
import { shuffle } from "./logic";
import useStoreForSendMove from "./useStoreForSendMove";

export const initStateChoiceTiles: ChoiceTilesType = {
    first_tiles: {
        coords: "",
        color_tiles: ""
    },
    second_tiles: {
        coords: "",
        color_tiles: ""
    }
}

export default function GameFrame({size}: IGameFrame) {
    const [choice_tiles, setChoiceTiles] = useState<ChoiceTilesType>(initStateChoiceTiles);

    //Массив цветов для плиток
    let colors_for_tiles = shuffle((new Array(size * size / 2).fill(COLOR_TYPE_TILE_1))
        .concat(new Array(size * size / 2).fill(COLOR_TYPE_TILE_2)));  
    
    
    let index_start = 0;    
    const generateRowTiles = (num_row: number)=>{
        const list_colors_for_row_tiles = colors_for_tiles.slice(index_start, index_start + size);

        return (
            <div>
                {list_colors_for_row_tiles.map((color, i)=>{
                    if (i == size - 1) index_start += size;
                    return <Tiles num_row={num_row.toString()} num_col={i.toString()} backgroundColor={color} choice_tiles={choice_tiles} setChoiceTiles={setChoiceTiles}/>
                })}
            </div>
        );
    }

    const generateColumns = ()=>{
        return (
            <div>
                {new Array(size).fill('').map((_, i)=>{
                    return (
                        <div>{generateRowTiles(i)}</div>
                    )
                })}
            </div>
        );
    }

    useStoreForSendMove([choice_tiles, setChoiceTiles]);

    return (
        <div style={{width: size * 100, height: size * 100, backgroundColor: COLOR_GAME_FRAME}}>
            {generateColumns()}
        </div>
    );
}