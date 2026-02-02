import { Dispatch, memo, SetStateAction, useEffect, useMemo, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { MyInput } from "../UI/MyInput";
import { makeStyles } from "@mui/styles";
import { CreatorDataType, TimersType } from "./Timer";

const useStyles = makeStyles({
  inputBox: {
    minWidth: '50vh',
    paddingBottom: 16,
    paddingTop: 16,
  }
});

type CreateTimerType = {
  addDate: ( date: TimersType )=>void;
  setCreatorData: Dispatch<SetStateAction<CreatorDataType>>;
  isOpen: boolean;
  data?: CreatorDataType;
};

export const CreateTimer: React.FC<CreateTimerType> = ({
  addDate,
  isOpen,
  setCreatorData,
  data,
}) => {

  const classes = useStyles();
  const [startDate, setStartDate] = useState<number>(data?.timer?.date || null);
  const [title, setTitle] = useState(data?.timer?.title || '');

  useEffect(() => {
    if (isOpen) {
      data?.timer?.title && setTitle(data.timer.title);
      data?.timer?.date && setStartDate(data.timer.date);
    }
  }, [isOpen]);

  console.log('title: ', title);

  const timestamp = useMemo(() => {
    return new Date(startDate).getTime();
  }, [startDate])

  const addTimer = () => {
    addDate({ date: timestamp, title, indx: data?.indx });
    setTitle('');
    setStartDate(null);
    setCreatorData(() => ({ isOpen: false }));
  };

  const onClose = () => {
    setTitle('');
    setStartDate(null);
    setCreatorData(() => ({ isOpen: false }));
  };

  return (
    <Box>
      <Button
        onClick={() => {
          setCreatorData(() => ({ isOpen: true }));
        }}
      >
        Создать таймер
      </Button>
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth={false}
      >
        <DialogContent>
          <Typography variant="h5">
            Создать таймер
          </Typography>
          <Box className={classes.inputBox}>
            <MyInput
              fullWidth
              label='Title'
              value={ title }
              onChange={e => setTitle(e.target.value)}
              error={!title}
              helperText={!title && 'Введите название таймера'}
            />
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
              <DatePicker
                label='DateTimer'
                value={ startDate && new Date(startDate) || null }
                onChange={(value: Date) => {
                  setStartDate(new Date(value).getTime());
                }}
                format='dd.MM.yyyy'
                slotProps={{
                  textField: {
                    size: 'small',
                  },
                  field: {
                    clearable: true,
                  }
                }}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={addTimer}
            disabled={!title || !startDate}
          >
            { data.timer ? 'Изменить' : 'Добавить' }
          </Button>
          <Button
            onClick={onClose}
          >
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default memo(CreateTimer);