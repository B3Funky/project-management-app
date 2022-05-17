import { axiosInstance } from './api';
import { AxiosInstance } from 'axios';

interface IUserId {
  userId: string;
}

interface IUserData {
  name: string;
  login: string;
  password: string;
}

class Users {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getAll() {}

  getUser(params: IUserId) {}

  deleteUser(params: IUserId) {}

  updateUser(params: IUserId, data: IUserData) {}
}

interface IBoardId {
  boardId: string;
}

interface IBoardData {
  title: string;
  description: string;
}

class Boards {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  getAll() {}

  createBoard(data: IBoardData) {}

  getBoard(params: IBoardId) {}

  deleteBoard(params: IBoardId) {}

  updateBoard(params: IBoardId, data: IBoardData) {}
}

interface IColumnId extends IBoardId {
  columnId: string;
}

interface IColumnData {
  title: string;
}

interface IColumnDataUpdate extends IColumnData {
  order: number;
}

class Columns {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  getAll(params: IBoardId) {}

  createColumn(params: IBoardId, data: IColumnData) {}

  getColumn(params: IColumnId) {}

  deleteColumn(params: IColumnId) {}

  updateColumn(params: IColumnId, data: IColumnDataUpdate) {}
}

interface ITaskId extends IColumnId {
  taskId: string;
}

interface ITaskData {
  title: string;
  description: string;
  userId: string;
}

interface ITaskDataUpdate extends ITaskData {
  order: number;
  boardId: string;
  columnId: string;
}

class Tasks {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  getAll(params: IColumnId) {}

  createColumn(params: IColumnId, data: ITaskData) {}

  getColumn(params: ITaskId) {}

  deleteColumn(params: ITaskId) {}

  updateColumn(params: ITaskId, data: ITaskDataUpdate) {}
}

interface IFileData {
  taskId: string;
  file: string;
}

interface IFileParams {
  taskId: string;
  filename: string;
}

class File {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  upload(data: IFileData) {}

  get(params: IFileParams) {}
}

export default class Api {
  private readonly axiosInstance: AxiosInstance;
  public readonly users: Users;
  public readonly boards: Boards;
  public readonly columns: Columns;
  public readonly tasks: Tasks;
  public readonly file: File;

  constructor() {
    this.axiosInstance = axiosInstance;
    this.users = new Users(this.axiosInstance);
    this.boards = new Boards(this.axiosInstance);
    this.columns = new Columns(this.axiosInstance);
    this.tasks = new Tasks(this.axiosInstance);
    this.file = new File(this.axiosInstance);
  }
}
