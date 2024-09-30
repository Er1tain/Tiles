import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TypeState {
    frame_size: FrameSize,
    moves: Move[],
    current_round: number
}

export interface Move {
    1: string,
    2: string,
    result: boolean
}

export type FrameSize = "2x2"|"4x4"|"8x8";

const initialState: TypeState = {
    frame_size: "2x2",
    moves: [],
    current_round: 1
}

const gameSlice = createSlice({
    name: "game",
    initialState: initialState,

    reducers: {
        choiceSize(state, action: PayloadAction<FrameSize>) {
            state.frame_size = action.payload;
        },

        addMove(state, action: PayloadAction<Move>) {
            state.moves.push(action.payload);
        },
        beginNewRound(state) {
            state.current_round++;
        },
        beginGame(state) {
            state.current_round = 1;
        }
    }

});

const store = configureStore({
    reducer: gameSlice.reducer
});

//Сохранение в localStorage размера игрового поля
store.subscribe(()=>{
    const frame_size = store.getState().frame_size;

    localStorage.setItem("frame_size", frame_size);
})

//Сохранение хода игрока
store.subscribe(()=>{
    const moves = store.getState().moves;

    localStorage.setItem("moves", JSON.stringify(moves));
    console.log(store.getState())
})

export const {choiceSize, addMove, beginNewRound, beginGame} = gameSlice.actions;
export default store;