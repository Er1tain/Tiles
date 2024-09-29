import { useEffect, useState } from "react";
import { useGameFrameContext } from "../app/hooks/useGameFrameContext";

interface ITiles {
    backgroundColor?: string
    num_col: string
    num_row: string
    colors_pair_tiles: {
        first_color: string;
        second_color: string;
    } | undefined
    setPairColors: React.Dispatch<React.SetStateAction<{
        first_color: string;
        second_color: string;
    } | undefined>>
}

export default function Tiles({backgroundColor = '', num_col, num_row, colors_pair_tiles, setPairColors}: ITiles) {
    //Плитка не видна пока на неё не кликнут
    const [bg, setBG] = useState<string>('');
    const OpenTiles = ()=> setBG(backgroundColor);

    //Координаты плитки(двузначное число; 1 цифра номер строки)
    const value_tile = num_row + num_col;

    //Контекст для сохранения текущего хода
    const context = useGameFrameContext();
    const state_move = context  ? context[0] : {1: "", 2: "", result: false};
    const setMove = context ? context[1] : ()=>{};

    const Moving = ()=>{
        if (state_move[1] == "" && setMove) setMove({1: value_tile, 2: "", result: false});
        else if (state_move[2] == "" && setMove) {
            const first = state_move[1];
            setMove({1: first, 2: value_tile, result: false});

        }

        //Пара цветов кликнутых плиток необходимы для задания result state_move 
        if (colors_pair_tiles?.first_color == "") {
            setPairColors({first_color: bg, second_color: ""});
            setTimeout(()=>console.log(colors_pair_tiles), 1000)

        }
        else if (colors_pair_tiles?.second_color == "") {
            const first_color = colors_pair_tiles.first_color;
            setPairColors({first_color: first_color, second_color: bg});

            //Сброс состояния для следующего хода
            setMove({
                1: "", 2: "", result: false
            });
            setTimeout(()=>console.log(colors_pair_tiles), 1000)
        }
        
    }

    //Функция-агрегатор для обработки события кнопки/плитки
    const handlerComposer = ()=>{
        OpenTiles();
        Moving();
    }

    return (
        <button className={'tile'} style={{width: 100, height: 100, background: bg}} onClick={handlerComposer} value={value_tile} disabled={bg != ''}/>  
    );
}