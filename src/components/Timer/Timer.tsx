import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CoolDown from "./CoolDown";
import CreateTimer from './CreateTimer';
import { useInitTimer } from './useInitTimer';

export type TimersType = {
  date: number;
  title: string;
  indx?: number;
  noDelete?: boolean;
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

export type CreatorDataType = {
  indx?: number;
  timer?: TimersType;
  isOpen: boolean;
};

export const Timer: React.FC = () => {
  const [creatorData, setCreatorData] = useState<CreatorDataType>({ isOpen: false });
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

  const editorTimer = (indx: number, item: TimersType) => {
    const data = { indx, timer: item, isOpen: true };
    console.log('dataaaaaaaaaaaaaaaaaaa: ', data);
    setCreatorData(data);
    // setIsOpenCreator(true);
  };

  const addDate = (date: TimersType) => {
    console.log('timersList: ', timersList);
    if (date.indx) {
      setTimersList(state => {
        const newState = [...state];
        newState.splice(date.indx, 1, { date: date.date, title: date.title });
        return newState;
      });
    } else {
      setTimersList(state => [...state, date]);
    }
  }

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
                deleteTimer={!item.noDelete && (() => deleteTimer(indx))}
                editTimer={!item.noDelete && (() => editorTimer(indx, item))}
              />
            ))
          }
        </Box>
      </Box>
      <CreateTimer
        isOpen={creatorData.isOpen}
        // setIsOpen={setIsOpenCreator}
        setCreatorData={setCreatorData}
        addDate={(date) => addDate(date)}
        data={creatorData}
      />
    </Box>
  );
};
