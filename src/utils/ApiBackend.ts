import { AxiosInstance, AxiosPromise, AxiosError } from 'axios';
import { axiosInstance } from './api';

function errorHandler(e: unknown) {
  if (e instanceof AxiosError) {
    if (e.response?.status === 401) {
      return e.response.data.message;
      // Unauthorized
      // e.response.data.message: "Unauthorized"
      // TODO Redirect to Welcome page
    } else if (e.response?.status === 400) {
      return e.response.data.message;
      // Bad Request
      // e.response.data.message: [
      //   "name must be a string",
      //   "login must be a string",
      //   "password must be a string"
      // ]
      //  e.response.data.error: "Bad Request"
    } else if (e.response?.status === 404) {
      return e.response.data.message;
      // Not found
      // e.response.data.message: "<...> was not founded!"
      // or wrong url
      // e.response.data.message: "Cannot GET <url>",
      // e.response.data.error: "Not Found"
    } else if (e.response?.status === 500) {
      return e.response.data.message;
      // Internal server error
      // e.response.data.error: "Internal server error"
      // For example: Comes when trying to set a login that already exists
    } else {
      return e.response?.data.message;
      // others errors
    }
  } else {
    return e;
    // unknown error
  }
}

function requestWrapper(request: AxiosPromise) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await request;
      resolve(res.data);
    } catch (e) {
      reject(errorHandler(e));
    }
  });
}

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

  async getAll() {
    return await requestWrapper(this.axiosInstance.get('/users'));
  }

  async getUser(params: IUserId) {
    return await requestWrapper(this.axiosInstance.get(`/users/${params.userId}`));
  }

  async deleteUser(params: IUserId) {
    return await requestWrapper(this.axiosInstance.delete(`/users/${params.userId}`));
  }

  async updateUser(params: IUserId, data: IUserData) {
    return await requestWrapper(this.axiosInstance.put(`/users/${params.userId}`, data));
  }
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
