import { COLOR_GAME_FRAME, COLOR_TYPE_TILE_1, COLOR_TYPE_TILE_2 } from "../shared/COLORS";
import Tiles from "./Tiles";

interface IGameFrame {
    size: number    //2, 4, 8 - 2x2 4x4 8x8
}

export default function GameFrame({size}: IGameFrame) {
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
                    return <Tiles num_row={num_row.toString()} num_col={i.toString()} backgroundColor={color}/>
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


    return (
        <div style={{width: size * 100, height: size * 100, backgroundColor: COLOR_GAME_FRAME}}>
            {generateColumns()}
        </div>
    );
}