import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SnackBarComponent, IErrorMessage } from '../SnackBar';
import { ModalComponent } from '../Modal';
import { InputComponent } from '../Input';
import { ButtonComponent } from '../Button';
import { useAppDispatch } from '../../redux-hooks';
import api, { ErrorResponse } from '../../utils/ApiBackend';
import { BoardSlice } from '../../store/reducers/BoardReducer';
import { ColumnSlice } from '../../store/reducers/ColumnReducer';
import { TaskSlice } from '../../store/reducers/TaskReducer';
import { IS_EMPTY_REGEXP } from '../../constants';
import { paths } from '../../routes/paths';
import { IBoard, IColumn, ITaskCreate } from '../../models/api';

interface IFieldValidMethod {
  value: string;
  regexp: RegExp;
  method: React.Dispatch<React.SetStateAction<string>>;
  errorText: string;
}

interface ICreateModal {
  thing: string;
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  onCreateCallback?(data: IColumn | ITaskCreate): void;
  columnId?: string;
}

export const CreateModal = ({
  thing,
  isActive,
  setActive,
  onCreateCallback,
  columnId,
}: ICreateModal) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [order] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<IErrorMessage | undefined>();

  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { addBoard } = BoardSlice.actions;
  // const { addColumn } = ColumnSlice.actions;
  const { addTask } = TaskSlice.actions;

  useEffect(() => {
    thing === 'Column' ? setDescription('empty') : null;

    title && description && !titleError && !descriptionError
      ? setIsFormDisabled(false)
      : setIsFormDisabled(true);
  }, [title, description]);

  const isFieldValid = ({ errorText, method, regexp, value }: IFieldValidMethod) => {
    regexp?.test(value) ? method(errorText) : method('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (thing === 'Board') {
      try {
        const board: IBoard = await api.board.create({ title: title, description: description });

        dispatch(addBoard({ ...board }));

        navigate(`${paths.boardForId}${board.id}`);
      } catch (e) {
        if (e instanceof ErrorResponse) {
          const errorMessage: IErrorMessage = Object.assign(
            { text: t('something_wrong'), severity: 'error' as const },
            e
          );
          setErrorMessage(errorMessage);
          setIsRequestError(true);
        }
      }
    } else if (thing === 'Column') {
      try {
        const column: IColumn = await api.column.create(
          { boardId: id as string },
          { title: title }
        );

        // dispatch(addColumn({ ...column }));

        if (onCreateCallback) {
          onCreateCallback(column);
        }
      } catch (e) {
        if (e instanceof ErrorResponse) {
          const errorMessage: IErrorMessage = Object.assign(
            { text: t('something_wrong'), severity: 'error' as const },
            e
          );
          setErrorMessage(errorMessage);
          setIsRequestError(true);
        }
      }
    } else if (thing === 'Task') {
      try {
        const userId = localStorage.getItem('userId');
        const task: ITaskCreate = await api.task.create(
          { boardId: id as string, columnId: columnId as string },
          { title: title, description: description, userId: userId as string }
        );

        dispatch(addTask({ ...task, files: [], order: 0, boardId: '', columnId: '' }));

        if (onCreateCallback) {
          onCreateCallback(task);
        }
      } catch (e) {
        if (e instanceof ErrorResponse) {
          const errorMessage: IErrorMessage = Object.assign(
            { text: t('something_wrong'), severity: 'error' as const },
            e
          );
          setErrorMessage(errorMessage);
          setIsRequestError(true);
        }
      }
    }

    setActive(false);
    setTitle('');
    setDescription('');
  };

  return (
    <>
      <SnackBarComponent
        isOpen={Boolean(isRequestError)}
        setIsOpen={setIsRequestError}
        message={errorMessage}
      ></SnackBarComponent>
      <ModalComponent active={isActive} setActive={setActive} isArrow>
        <form onSubmit={handleSubmit}>
          <Grid container flexDirection="column" alignItems="center">
            <Grid>
              <Typography>Add {thing} Title</Typography>
              <InputComponent
                errorText={titleError}
                onChange={(e) => {
                  setTitle(e.target.value);
                  isFieldValid({
                    value: e.target.value,
                    errorText: 'Field should be fill',
                    method: setTitleError,
                    regexp: IS_EMPTY_REGEXP,
                  });
                }}
              />
            </Grid>
            {thing !== 'Column' ? (
              <Grid>
                <Typography>Add {thing} Description</Typography>
                <InputComponent
                  errorText={descriptionError}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    isFieldValid({
                      value: e.target.value,
                      errorText: 'Field should be fill',
                      method: setDescriptionError,
                      regexp: IS_EMPTY_REGEXP,
                    });
                  }}
                />
              </Grid>
            ) : null}

            <ButtonComponent isDisabled={isFormDisabled} type="submit" variant="contained">
              <Typography>Create {thing}</Typography>
            </ButtonComponent>
          </Grid>
        </form>
      </ModalComponent>
    </>
  );
};
