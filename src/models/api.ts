export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface IBoard {
  id: string;
  title: string;
  description: string;
}

export interface IBoardById extends IBoard {
  columns: IColumnById[];
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export type ITaskForColumnById = Omit<ITask, 'columnId' | 'boardId'>;

export interface IColumnById extends IColumn {
  tasks: ITaskForColumnById[];
}

export interface ITaskCreate {
  id: string;
  title: string;
  description: string;
  userId: string;
}

export interface ITaskUpdate extends ITaskCreate {
  order: number;
  boardId: string;
  columnId: string;
}

export interface ITask extends ITaskUpdate {
  files: IFile[];
}

export interface IFile {
  filename: string;
  fileSize: number;
}
