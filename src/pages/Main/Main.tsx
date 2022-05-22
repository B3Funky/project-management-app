import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Header } from '../../components/Header';
import { paths } from '../../routes/paths';

import './main.css';
import { BoardPreview } from '../../components/BoardPreview';
import { IBoardPreview } from '../../components/BoardPreview/BoardPreview';
import { ButtonComponent } from '../../components/Button';
import { ModalComponent } from '../../components/Modal';
import { InputComponent } from '../../components/Input';
import { IS_EMPTY_REGEXP } from '../../constants';

interface IFieldValidMethod {
  value: string;
  regexp: RegExp;
  method: React.Dispatch<React.SetStateAction<string>>;
  errorText: string;
}

export function Main() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isCreateBoardModalActive, setIsCreateBoardModalActive] = useState(false);
  const [boardTitle, setBoardTitle] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [boards, setBoards] = useState<IBoardPreview[]>([
    { title: 'Title 1', description: 'Description1! HelloWorld1', id: 1 },
    { title: 'Title 2', description: 'Description1! HelloWorld2', id: 2 },
    { title: 'Title 3', description: 'Description1! HelloWorld3', id: 3 },
    { title: 'Title 3', description: 'Description1! HelloWorld3', id: 4 },
    { title: 'Title 3', description: 'Description1! HelloWorld3', id: 5 },
  ]);

  useEffect(() => {
    boardTitle && boardDescription && !titleError && !descriptionError
      ? setIsFormDisabled(false)
      : setIsFormDisabled(true);
  }, [boardTitle, boardDescription]);

  const isFieldValid = ({ errorText, method, regexp, value }: IFieldValidMethod) => {
    regexp?.test(value) ? method(errorText) : method('');
  };

  const addNewBoard = () => {
    setBoards([...boards, { title: boardTitle, description: boardDescription, id: Date.now() }]);
    setIsCreateBoardModalActive(false);
    setBoardTitle('');
    setBoardDescription('');
  };

  return (
    <>
      <Header />
      <Grid
        height="100%"
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1>{t('welcome_to_react')}</h1>
        <NavLink to={paths.board}>{t('to_board_page')}</NavLink>
        <Grid container justifyContent="flex-start" flexWrap="wrap" p="0px 25px">
          {boards.map(({ title, description, id }) => (
            <BoardPreview
              key={id}
              id={id}
              title={title}
              description={description}
              onClick={() => navigate(`/board/${id}`)}
            />
          ))}
          <ButtonComponent onClick={() => setIsCreateBoardModalActive(true)}>
            <Typography>Add new Board</Typography>
          </ButtonComponent>
        </Grid>
      </Grid>
      <ModalComponent active={isCreateBoardModalActive} setActive={setIsCreateBoardModalActive}>
        <form onSubmit={addNewBoard}>
          <Grid container flexDirection="column" alignItems="center">
            <Grid>
              <Typography>Add Board Title</Typography>
              <InputComponent
                errorText={titleError}
                onChange={(e) => {
                  setBoardTitle(e.target.value);
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
              <Typography>Add Board Description</Typography>
              <InputComponent
                errorText={descriptionError}
                onChange={(e) => {
                  setBoardDescription(e.target.value);
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
              <Typography>Create Board</Typography>
            </ButtonComponent>
          </Grid>
        </form>
      </ModalComponent>
    </>
  );
}
