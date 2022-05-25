import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaskCard } from '../../../components/TaskCard/TaskCard';

interface ITaskData {
  tasks: ITaskCard[];
}

const initialState: ITaskData = {
  tasks: [],
};

export const TaskSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITaskCard>) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export default TaskSlice.reducer;
