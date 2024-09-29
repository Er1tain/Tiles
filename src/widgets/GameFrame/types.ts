export interface IGameFrame {
    size: number    //2, 4, 8 - 2x2 4x4 8x8
}

export type ChoiceTilesType = {
    first_tiles: {
        coords: string,
        color_tiles: string
    },
    second_tiles: {
        coords: string,
        color_tiles: string
    }
}