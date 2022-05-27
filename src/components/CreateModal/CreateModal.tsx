import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

import { ModalComponent } from '../Modal';
import { InputComponent } from '../Input';
import { ButtonComponent } from '../Button';
import { useAppDispatch } from '../../redux-hooks';
import api from '../../utils/ApiBackend';
import { BoardSlice } from '../../store/reducers/BoardReducer';
import { ColumnSlice } from '../../store/reducers/ColumnReducer';
import { TaskSlice } from '../../store/reducers/TaskReducer';
import { IS_EMPTY_REGEXP } from '../../constants';
import { IBoard } from '../../models/api';

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
}

export const CreateModal = ({ thing, isActive, setActive }: ICreateModal) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { addBoard } = BoardSlice.actions;
  const { addColumn } = ColumnSlice.actions;
  const { addTask } = TaskSlice.actions;

  useEffect(() => {
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
      let board: IBoard;
      try {
        board = await api.board.create({ title: title, description: description });
        dispatch(addBoard({ ...board }));
        // TODO Maybe not good decision
        navigate(`/board/${board.id}`);
      } catch (e) {
        // TODO Error Modal
      }
    } else if (thing === 'Column') {
      dispatch(addColumn({ title: title, description: description, id: Date.now() }));
    } else if (thing === 'Task') {
      dispatch(addTask({ title: title, description: description, id: Date.now() }));
    }

    setActive(false);
    setTitle('');
    setDescription('');
  };

  return (
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
          <ButtonComponent isDisabled={isFormDisabled} type="submit" variant="contained">
            <Typography>Create {thing}</Typography>
          </ButtonComponent>
        </Grid>
      </form>
    </ModalComponent>
  );
};
