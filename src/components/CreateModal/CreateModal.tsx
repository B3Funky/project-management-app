import React, { useEffect, useState } from 'react';
import { ModalComponent } from '../Modal';
import { InputComponent } from '../Input';
import { IS_EMPTY_REGEXP } from '../../constants';
import { ButtonComponent } from '../Button';
import { Grid, Typography } from '@mui/material';
import { useAppDispatch } from '../../redux-hooks';
import { BoardSlice } from '../../store/reducers/BoardReducer';
import { ColumnSlice } from '../../store/reducers/ColumnReducer';
import { TaskSlice } from '../../store/reducers/TaskReducer';

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

  const dispatch = useAppDispatch();
  const { addBoard } = BoardSlice.actions;
  const { addColumn } = ColumnSlice.actions;
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

  const handleSubmit = () => {
    if (thing === 'Board') {
      dispatch(addBoard({ title: title, description: description, id: Date.now() }));
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
  );
};
