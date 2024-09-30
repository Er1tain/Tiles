import { ChoiceTilesType } from "./types"

export default function blockedTiles(choice_tiles: ChoiceTilesType) {
    
    document.querySelectorAll("button").forEach(tile=>{
        if (tile.value == choice_tiles.first_tiles.coords || tile.value == choice_tiles.second_tiles.coords) tile.style.background = "black"
    });
    
}