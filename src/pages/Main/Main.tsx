import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Header } from '../../components/Header';

import './main.css';
import { BoardPreview } from '../../components/BoardPreview';
import { ButtonComponent } from '../../components/Button';
import { CreateModal } from '../../components/CreateModal';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { BoardSlice } from '../../store/reducers/BoardReducer';

export function Main() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalActive, setIsModalActive] = useState(false);

  const { taskBoards } = useAppSelector((state) => state.BoardReducer);
  const { deleteBoard } = BoardSlice.actions;
  const dispatch = useAppDispatch();

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
        <Grid container justifyContent="flex-start" flexWrap="wrap" p="0px 25px">
          {taskBoards.map(({ title, description, id }) => (
            <BoardPreview
              key={id}
              id={id}
              title={title}
              description={description}
              onClick={() => navigate(`/board/${id}`)}
              handleDelete={() => dispatch(deleteBoard(id))}
            />
          ))}
          <ButtonComponent
            onClick={() => setIsModalActive(true)}
            sx={{
              minWidth: '275px',
              maxWidth: '350px',
              height: '100px',
              margin: '10px',
              backgroundColor: 'rgba(196, 204, 204, 0.4)',
              '&:hover': {
                backgroundColor: 'rgba(175, 182, 182, 0.4)',
              },
            }}
          >
            <Typography>Add new Board</Typography>
          </ButtonComponent>
        </Grid>
      </Grid>
      <CreateModal isActive={isModalActive} setActive={setIsModalActive} thing="Board" />
    </>
  );
}
