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

  async get(params: IUserId) {
    return await requestWrapper(this.axiosInstance.get(`/users/${params.userId}`));
  }

  async delete(params: IUserId) {
    return await requestWrapper(this.axiosInstance.delete(`/users/${params.userId}`));
  }

  async update(params: IUserId, data: IUserData) {
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

  async getAll() {
    return await requestWrapper(this.axiosInstance.get('/boards'));
  }

  async create(data: IBoardData) {
    return await requestWrapper(this.axiosInstance.post('/boards', data));
  }

  async get(params: IBoardId) {
    return await requestWrapper(this.axiosInstance.get(`/boards/${params.boardId}`));
  }

  async delete(params: IBoardId) {
    return await requestWrapper(this.axiosInstance.delete(`/boards/${params.boardId}`));
  }

  async update(params: IBoardId, data: IBoardData) {
    return await requestWrapper(this.axiosInstance.put(`/boards/${params.boardId}`, data));
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
    return await requestWrapper(this.axiosInstance.get(`/boards/${params.boardId}/columns`));
  }

  async create(params: IBoardId, data: IColumnData) {
    return await requestWrapper(this.axiosInstance.post(`/boards/${params.boardId}/columns`, data));
  }

  async get(params: IColumnId) {
    return await requestWrapper(
      this.axiosInstance.get(`/boards/${params.boardId}/columns/${params.columnId}`)
    );
  }

  async delete(params: IColumnId) {
    return await requestWrapper(
      this.axiosInstance.delete(`/boards/${params.boardId}/columns/${params.columnId}`)
    );
  }

  async update(params: IColumnId, data: IColumnDataUpdate) {
    return await requestWrapper(
      this.axiosInstance.put(`/boards/${params.boardId}/columns/${params.columnId}`, data)
    );
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

  async getAll(params: IColumnId) {
    return await requestWrapper(
      this.axiosInstance.get(`/boards/${params.boardId}/columns/${params.columnId}/tasks`)
    );
  }

  async create(params: IColumnId, data: ITaskData) {
    return await requestWrapper(
      this.axiosInstance.post(`/boards/${params.boardId}/columns/${params.columnId}/tasks`, data)
    );
  }

  async get(params: ITaskId) {
    return await requestWrapper(
      this.axiosInstance.get(
        `/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.taskId}`
      )
    );
  }

  async delete(params: ITaskId) {
    return await requestWrapper(
      this.axiosInstance.delete(
        `/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.taskId}`
      )
    );
  }

  async update(params: ITaskId, data: ITaskDataUpdate) {
    return await requestWrapper(
      this.axiosInstance.put(
        `/boards/${params.boardId}/columns/${params.columnId}/tasks/${params.taskId}`,
        data
      )
    );
  }
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
