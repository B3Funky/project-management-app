import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBoardPreview } from '../../../components/BoardPreview/BoardPreview';

interface IBoardData {
  taskBoards: IBoardPreview[];
  currentBoard: IBoardPreview;
}

const initialState: IBoardData = {
  taskBoards: [],
  currentBoard: { id: '0', description: '', title: '' },
};

export const BoardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    getCurrentBoard(state, action: PayloadAction<string>) {
      state.currentBoard = state.taskBoards.filter((board) => board.id === action.payload)[0];
    },
    addBoard(state, action: PayloadAction<IBoardPreview>) {
      state.taskBoards.push(action.payload);
    },
  },
});

export default BoardSlice.reducer;
