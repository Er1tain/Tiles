import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { initStateChoiceTiles } from "./GameFrame/GameFrame";

interface ITiles {
    backgroundColor?: string
    num_col: string
    num_row: string
    choice_tiles: any
    setChoiceTiles: Dispatch<SetStateAction<any | null>>
}

export default function Tiles({backgroundColor = '', num_col, num_row, choice_tiles, setChoiceTiles}: ITiles) {
    //Плитка не видна пока на неё не кликнут
    const [bg, setBG] = useState<string>('');
    const OpenTiles = ()=>setBG(backgroundColor);

    //Ccылка на функцию изменения состояния плитки
    const ref_tile_and_state = useRef<Dispatch<SetStateAction<string>>>(setBG);

    //Координаты плитки(двузначное число; 1 цифра номер строки)
    const value_tile = num_row + num_col;

    useEffect(()=>{
        if (bg == '') {}
        else if (choice_tiles == initStateChoiceTiles) {
            setChoiceTiles({
                first_tiles: {
                    coords: value_tile,
                    color_tiles: bg
                },
                second_tiles: {
                    coords: "",
                    color_tiles: ""
                }
            })
        } else {
            const current_choice_tiles = choice_tiles;
            setChoiceTiles({
                first_tiles: current_choice_tiles.first_tiles,
                second_tiles: {
                    coords: value_tile,
                    color_tiles: bg
                }
            });
        }
    } ,[bg])

    return (
        <button className={'tile'} style={{width: 100, height: 100, background: bg}} onClick={OpenTiles} value={value_tile} disabled={bg != ''}/>  
    );
}