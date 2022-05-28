import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Header } from '../../components/Header';
import { Spinner } from '../../components/Spinner';
import { BoardPreview } from '../../components/BoardPreview';
import { ButtonComponent } from '../../components/Button';
import { CreateModal } from '../../components/CreateModal';
import api from '../../utils/ApiBackend';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { BoardSlice } from '../../store/reducers/BoardReducer';
import { paths } from '../../routes/paths';
import { IBoard } from '../../models/api';

import './main.css';

export function Main() {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [isBoardsLoad, setIsBoardsLoad] = useState<boolean>(false);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<string>('');

  const { t } = useTranslation();
  const navigate = useNavigate();

  const { taskBoards } = useAppSelector((state) => state.BoardReducer);
  const { deleteBoard } = BoardSlice.actions;
  const dispatch = useAppDispatch();

  const getBoards = async () => {
    try {
      const res: IBoard[] = await api.board.getAll();
      setBoards(res);
      setIsBoardsLoad(true);
    } catch (e) {
      // TODO Error Modal
    }
  };

  const handleDeleteBoardPreview = (id: string) => {
    setRefresh(id);
    dispatch(deleteBoard(id));
  };

  useEffect(() => {
    getBoards().then();
  }, [refresh]);

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
        {!isBoardsLoad ? (
          <Spinner />
        ) : (
          <Grid container justifyContent="flex-start" flexWrap="wrap" p="0px 25px">
            {boards.map(({ id, title, description }) => (
              <BoardPreview
                key={id}
                id={id}
                title={title}
                description={description}
                onClick={() => navigate(`${paths.boardForId}${id}`)}
                onDelete={() => handleDeleteBoardPreview(id)}
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
