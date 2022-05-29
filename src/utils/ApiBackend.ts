import { AxiosInstance, AxiosPromise, AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from './api';
import {
  IUser,
  IBoard,
  IBoardById,
  IColumn,
  IColumnById,
  ITask,
  ITaskCreate,
  ITaskUpdate,
} from '../models/api';

export class ErrorResponse {
  readonly status: number;
  readonly message: string | string[];

  constructor(response: AxiosResponse) {
    this.status = response.status;
    this.message = response.data.message;
  }
}

function errorHandler(e: unknown) {
  if (e instanceof AxiosError) {
    if (e.response) {
      return new ErrorResponse(e.response);

      // Unauthorized
      // e.response.status: 401
      // e.response.data.message: "Unauthorized"

      // Bad Request
      // e.response.status: 400
      // e.response.data.message: [
      //   "name must be a string",
      //   "login must be a string",
      //   "password must be a string"
      // ]
      //  e.response.data.error: "Bad Request"

      // Not found
      // e.response.status: 404
      // e.response.data.message: "<...> was not founded!"
      // or wrong url
      // e.response.data.message: "Cannot GET <url>",
      // e.response.data.error: "Not Found"

      // Conflict
      // e.response.status: 409
      // e.response.data.error: "File already exists!"

      // Internal server error
      // e.response.status: 500
      // e.response.data.error: "Internal server error"
      // For example: Comes when trying to set a login that already exists
      // others errors
    } else {
      return e;
      // unknown error
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
    return (await requestWrapper(this.axiosInstance.get('/users'))) as IUser[];
  }

  async get(params: IUserId) {
    return (await requestWrapper(this.axiosInstance.get(`/users/${params.userId}`))) as IUser;
  }

  async delete(params: IUserId) {
    return (await requestWrapper(this.axiosInstance.delete(`/users/${params.userId}`))) as '';
  }

  async update(params: IUserId, data: IUserData) {
    return (await requestWrapper(this.axiosInstance.put(`/users/${params.userId}`, data))) as IUser;
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

  async getAll() {
    return (await requestWrapper(this.axiosInstance.get('/boards'))) as IBoard[];
  }

  async create(data: IBoardData) {
    return (await requestWrapper(this.axiosInstance.post('/boards', data))) as IBoard;
  }

  async get(params: IBoardId) {
    return (await requestWrapper(
      this.axiosInstance.get(`/boards/${params.boardId}`)
    )) as IBoardById;
  }

  async delete(params: IBoardId) {
    return (await requestWrapper(this.axiosInstance.delete(`/boards/${params.boardId}`))) as '';
  }

  async update(params: IBoardId, data: IBoardData) {
    return (await requestWrapper(
      this.axiosInstance.put(`/boards/${params.boardId}`, data)
    )) as IBoard;
  }
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

  async getAll(params: IBoardId) {
    return (await requestWrapper(
      this.axiosInstance.get(`/boards/${params.boardId}/columns`)
    )) as IColumn[];
  }

  async create(params: IBoardId, data: IColumnData) {
    return (await requestWrapper(
      this.axiosInstance.post(`/boards/${params.boardId}/columns`, data)
    )) as IColumn;
  }

  async get(params: IColumnId) {
    return (await requestWrapper(
      this.axiosInstance.get(`/boards/${params.boardId}/columns/${params.columnId}`)
    )) as IColumnById;
  }

  async delete(params: IColumnId) {
    return (await requestWrapper(
      this.axiosInstance.delete(`/boards/${params.boardId}/columns/${params.columnId}`)
    )) as '';
  }

  async update(params: IColumnId, data: IColumnDataUpdate) {
    return (await requestWrapper(
      this.axiosInstance.put(`/boards/${params.boardId}/columns/${params.columnId}`, data)
    )) as IColumn;
  }
}

interface ITaskId extends IColumnId {
  taskId: string;
}

interface ITaskData {
  title: string;
  description: string;
  userId: string;
}

export interface ITaskDataUpdate extends ITaskData {
  order: number;
  boardId: string;
  columnId: string;
}

class Tasks {
  private readonly axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getAll(params: IColumnId) {
    return (await requestWrapper(
      this.axiosInstance.get(`/boards/${params.boardId}/columns/${params.columnId}/tasks`)
    )) as ITask[];
  }

  async create(params: IColumnId, data: ITaskData) {
    return (await requestWrapper(
      this.axiosInstance.post(`/boards/${params.boardId}/columns/${params.columnId}/tasks`, data)
    )) as ITaskCreate;
  }

  async get(params: ITaskId) {
    return (await requestWrapper(
      this.axiosInstance.get(
        `/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.taskId}`
      )
    )) as ITask;
  }

  async delete(params: ITaskId) {
    return (await requestWrapper(
      this.axiosInstance.delete(
        `/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.taskId}`
      )
    )) as '';
  }

  async update(params: ITaskId, data: ITaskDataUpdate) {
    return (await requestWrapper(
      this.axiosInstance.put(
        `/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.taskId}`,
        data
      )
    )) as ITaskUpdate;
  }
}

interface IFileData {
  taskId: string;
  file: Blob;
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

  async upload(data: IFileData) {
    const formData = new FormData();
    formData.append('taskId', data.taskId);
    formData.append('file', data.file);
    return (await requestWrapper(
      this.axiosInstance.post('/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    )) as 'File uploaded!';
  }

  async get(params: IFileParams) {
    return await requestWrapper(
      this.axiosInstance.get(`/file/${params.taskId}/${params.filename}`)
    );
  }
}

class Api {
  private readonly axiosInstance: AxiosInstance;
  public readonly user: Users;
  public readonly board: Boards;
  public readonly column: Columns;
  public readonly task: Tasks;
  public readonly file: File;

  constructor() {
    this.axiosInstance = axiosInstance;
    this.user = new Users(this.axiosInstance);
    this.board = new Boards(this.axiosInstance);
    this.column = new Columns(this.axiosInstance);
    this.task = new Tasks(this.axiosInstance);
    this.file = new File(this.axiosInstance);
  }
}

const api = new Api();

export default api;
