import { useState } from "react";

interface ITiles {
    backgroundColor?: string
    num_col: string
    num_row: string
}

export default function Tiles({backgroundColor = '', num_col, num_row}: ITiles) {
    //Плитка не видна пока на неё не кликнут
    const [bg, setBG] = useState<string>('');
    const OpenTiles = ()=>setBG(backgroundColor);

    //Координаты плитки(двузначное число; 1 цифра номер строки)
    const value_tile = num_row + num_col;

    return (
        <button className={'tile'} style={{width: 100, height: 100, background: bg}} onClick={OpenTiles} value={value_tile}/>  
    );
}