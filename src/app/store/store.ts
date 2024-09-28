import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Move {
    1: string,
    2: string
}

export type FrameSize = "2x2"|"4x4"|"8x8";

const initialStateMoves: Move[] = []; 

const gameSlice = createSlice({
    name: "game",
    initialState: {
        frame_size: "",
        moves: initialStateMoves
    },

    reducers: {
        choiceSize(state, action: PayloadAction<FrameSize>) {
            state.frame_size = action.payload;
        },

        addMove(state, action: PayloadAction<Move>) {
            state.moves.push(action.payload);
        }
    }

});

export const store = configureStore({
    reducer: gameSlice.reducer
});

export const {choiceSize, addMove} = gameSlice.actions;
