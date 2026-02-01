import { useMemo, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MyInput } from "../UI/MyInput";
import { makeStyles } from "@mui/styles";
import { TimersType } from "./Timer";

const useStyles = makeStyles({
  inputBox: {
    minWidth: '50vh',
    paddingBottom: 16,
    paddingTop: 16,
  }
});

type CreateTimerType = {
  addDate: ( date: TimersType )=>void;
};

export const CreateTimer: React.FC<CreateTimerType> = ({ addDate }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [title, setTitle] = useState('');

  const timestamp = useMemo(() => {
    return new Date(startDate).getTime();
  }, [startDate])

  const addTimer = () => {
    addDate({ date: timestamp, title });
    setTitle('');
    setStartDate(new Date());
    setIsOpen(false);
  };

  const close = () => {
    setTitle('');
    setStartDate(new Date());
    setIsOpen(false);
  };

  const disable = !title;

  return (
    <Box>
      <Button
        onClick={() => setIsOpen(true)}
      >
        Создать таймер
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
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
              value={title}
              onChange={e => setTitle(e.target.value)}
              error={disable}
              helperText={!title && 'Введите название таймера'}
            />
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={startDate}
                onChange={(value: Date) => {
                  console.log(value);
                  setStartDate(value)
                }}
                format='dd.MM.yyyy'
                // minDate={new Date()}
                slotProps={{
                  textField: {
                    size: 'small',
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={addTimer}
            disabled={disable}
          >
            Добавить
          </Button>
          <Button
            onClick={close}
          >
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
