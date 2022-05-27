import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITasksColumn } from '../../../components/TasksColumn/TasksColumn';

interface IColumnData {
  taskColumns: ITasksColumn[];
}

const initialState: IColumnData = {
  taskColumns: [],
};

export const ColumnSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addColumn(state, action: PayloadAction<ITasksColumn>) {
      state.taskColumns.push(action.payload);
    },
    deleteColumn(state, action: PayloadAction<string>) {
      state.taskColumns = state.taskColumns.filter((column) => column.id !== action.payload);
    },
  },
});

export default ColumnSlice.reducer;
