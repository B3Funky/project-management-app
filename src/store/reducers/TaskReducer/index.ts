import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaskCard } from '../../../components/TaskCard/TaskCard';

interface ITaskData {
  tasks: ITaskCard[];
  currentTask: ITaskCard;
}

const initialState: ITaskData = {
  tasks: [],
  currentTask: { id: '', title: '' },
};

export const TaskSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<ITaskCard>) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    getCurrentTask(state, action: PayloadAction<string>) {
      state.currentTask = state.tasks.filter((task) => task.id === action.payload)[0];
    },
  },
});

export default TaskSlice.reducer;
