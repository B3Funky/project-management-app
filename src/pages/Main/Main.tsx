import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Header } from '../../components/Header';
import { Spinner } from '../../components/Spinner';
import { BoardPreview } from '../../components/BoardPreview';
import { ButtonComponent } from '../../components/Button';
import { CreateModal } from '../../components/CreateModal';
import api from '../../utils/ApiBackend';
import { useAppSelector } from '../../redux-hooks';
import { paths } from '../../routes/paths';
import { IBoard } from '../../models/api';

import './main.css';

export function Main() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalActive, setIsModalActive] = useState(false);
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [isBoardsLoad, setIsBoardsLoad] = useState<boolean>(false);

  const { taskBoards } = useAppSelector((state) => state.BoardReducer);

  const getBoards = async () => {
    const res: IBoard[] = await api.board.getAll();
    setBoards(res);
    setIsBoardsLoad(true);
  };

  useEffect(() => {
    getBoards().then();
  }, []);

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
        {!isBoardsLoad ? (
          <Spinner />
        ) : (
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
        )}
      </Grid>
      <CreateModal isActive={isModalActive} setActive={setIsModalActive} thing="Board" />
    </>
  );
}
