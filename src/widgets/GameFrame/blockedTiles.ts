import { ChoiceTilesType } from "./types"
import { COLOR_TRUE_MOVE } from "../../shared/COLORS";

let count_click = 0;

export default function blockedTiles(choice_tiles: ChoiceTilesType, frame_size: number) {

    document.querySelectorAll("button").forEach(tile=>{
        if (tile.value == choice_tiles.first_tiles.coords || tile.value == choice_tiles.second_tiles.coords) tile.style.background = COLOR_TRUE_MOVE;
    });
    count_click += 2;
    if (count_click == frame_size * 2) window.location.href = '/result';
}