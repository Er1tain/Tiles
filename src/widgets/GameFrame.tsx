import { useEffect, useState } from "react";
import { useGameFrameContext } from "../app/hooks/useGameFrameContext";
import { COLOR_GAME_FRAME, COLOR_TYPE_TILE_1, COLOR_TYPE_TILE_2 } from "../shared/COLORS";
import Tiles from "./Tiles";
import { useDispatch } from "react-redux";
import { addMove } from "../app/store/store";

interface IGameFrame {
    size: number    //2, 4, 8 - 2x2 4x4 8x8
}

export default function GameFrame({size}: IGameFrame) {
    //Цвета плиток, выбранных на текущем ходу
    const [colors_pair_tiles, setPairColors] = useState<{first_color: string, second_color: string}|undefined>({
        first_color: "", second_color: ""
    });

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
                    return <Tiles colors_pair_tiles={colors_pair_tiles} setPairColors={setPairColors} num_row={num_row.toString()} num_col={i.toString()} backgroundColor={color}/>
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

    //Контекст для завершения состояния хода и отправки в хранилище
    const context = useGameFrameContext();
    const state_move = context  ? context[0] : {1: "", 2: "", result: false};

    //При клике на плитку
    const dispatch = useDispatch();

    useEffect(()=>{
        if (state_move[1] != "" && state_move[2] != "") {
            let result: boolean = false;
            if (colors_pair_tiles?.first_color == colors_pair_tiles?.second_color) result = true;

            //Устанавливаем результат для хода
            let current_state_move = state_move;
            if (current_state_move) {
                current_state_move.result = result;

                dispatch(addMove(current_state_move));


            }  

        }

    } ,[state_move])
    //

    return (
        <div style={{width: size * 100, height: size * 100, backgroundColor: COLOR_GAME_FRAME}}>
            {generateColumns()}
        </div>
    );
}