import { useEffect, useState } from "react";
import { COLOR_GAME_FRAME, COLOR_TYPE_TILE_1, COLOR_TYPE_TILE_2 } from "../shared/COLORS";
import Tiles from "./Tiles";
import { useDispatch } from "react-redux";
import { addMove, Move } from "../app/store/store";

interface IGameFrame {
    size: number    //2, 4, 8 - 2x2 4x4 8x8
}

type ChoiceTilesType = {
    first_tiles: {
        coords: string,
        color_tiles: string
    },
    second_tiles: {
        coords: string,
        color_tiles: string
    }
}

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

    //Функция для перемешивания, чтоб обеспечить уникальность разных партий    
    const shuffle = (array: any[]) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
       
        while (0 !== currentIndex) {       
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
       
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
       
        return array;
      }

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


    return (
        <div style={{width: size * 100, height: size * 100, backgroundColor: COLOR_GAME_FRAME}}>
            {generateColumns()}
        </div>
    );
}