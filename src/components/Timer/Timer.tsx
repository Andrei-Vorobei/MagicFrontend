import { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Box, Typography } from '@mui/material';
import { CoolDown } from "./CoolDown";
import { CreateTimer } from './CreateTimer';
import { useInitTimer } from './useInitTimer';

export type TimersType = {
  date: number;
  title: string;
};

type TimerType = {
  days: number | string;
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
}

export type CoolDownType = {
  timerItems: TimerType;
  title: string;
}

export const Timer: React.FC = () => {
  const {
    initTimer,
    titleDate,
    dateNow
  } = useInitTimer();
  const [timersList, setTimersList] = useState<TimersType[]>(initTimer);

  const deleteTimer = (indx: number) => {
    setTimersList(state => {
      const newState = [...state];
      newState.splice(indx, 1);
      return newState;
    });
  };

  return (
    <Box>
      <Box>
        <Box>
          <Typography variant='h4'>
            Timer
          </Typography>
          <Typography variant='h6'>
            Сейчас { titleDate }
          </Typography>
        </Box>
        <Box display='flex' gap={2} flexDirection='column'>
          {
            timersList.map((item, indx) => (
              <CoolDown
                key={`${indx}_${item.date}`}
                dateNow={dateNow}
                date={item.date}
                title={item.title}
                deleteTimer={!!indx && (() => deleteTimer(indx))}
              />
            ))
          }
        </Box>
      </Box>
      <CreateTimer addDate={(date) => setTimersList(state => [...state, date])} />
    </Box>
  );
};
