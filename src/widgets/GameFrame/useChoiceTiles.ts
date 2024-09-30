import { useEffect } from "react";
import { ChoiceTilesType } from "./types";

//Хук для 2х сценариев: выбраны плитки разных цветов или одного
export default function useChoiceTiles(choice_tiles : ChoiceTilesType) {
    useEffect(()=>{
        if (choice_tiles.first_tiles.color_tiles == choice_tiles.second_tiles.color_tiles) {
            Array.from(document.getElementsByTagName('button')).forEach(tile=>{
                switch(tile.value) {
                    case choice_tiles.first_tiles.coords || choice_tiles.second_tiles.coords:
                        tile.style.backgroundColor = "black";
                        break;
                }
            })
        }
    }, [choice_tiles])
}