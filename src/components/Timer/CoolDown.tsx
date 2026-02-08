import { memo, MouseEventHandler, useMemo } from "react";
import { Box, Card, CSSProperties, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import moment from "moment";

type CoolDownType = {
  date: number;
  title?: string;
  dateNow: number;
  deleteTimer?: MouseEventHandler<HTMLDivElement>;
  editTimer?: MouseEventHandler<HTMLDivElement>;
}

const useStyles = makeStyles({
  titleBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    justifyContent: 'center',
    padding: '0 8px',
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    minWidth: 51
  }
});

export const CoolDown: React.FC<CoolDownType> = ({
    date,
    title,
    dateNow,
    deleteTimer,
    editTimer
  }) => {
  const classes = useStyles();

  const format = (num: number): number | string => {
    if (num < 10 && num > 0) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const formatDate = useMemo(() => {
    return moment(date).locale('ru').format('DD MMMM YYYY');
  }, [date]);

  const delta = useMemo(() => {
    return date - dateNow;
  }, [dateNow]);

  const timerItems = useMemo(() =>{
    return {
      days: format(Math.floor(delta / (1000 * 60 * 60 * 24))),
      hours: format(Math.floor(delta / (1000 * 60 * 60) % 24)),
      minutes: format(Math.floor(delta / (1000 * 60) % 60)),
      seconds: format(Math.floor(delta / 1000 % 60)),
    };
  }, [delta]);

  const cardStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1.5,
    width: 80
  };

  const timerStyles: CSSProperties = {
    display: 'flex',
    gap: 2.5,
    justifyContent: 'center',
    padding: '0 8px',
  };

  return (
    <Box className={classes.content}>
      <Box className={classes.titleBox}>
        <Typography>
          { formatDate }
        </Typography>
        <Typography variant="h5">
          { title }:
        </Typography>
      </Box>
      <Box sx={ timerStyles }>
        <Card sx={ cardStyle } raised>
          <Typography variant="h6">
            { timerItems.days }
          </Typography>
          <Typography variant="h6">
            days
          </Typography>
        </Card>
        <Card sx={ cardStyle } raised>
          <Typography variant="h6">
            { timerItems.hours }
          </Typography>
          <Typography variant="h6">
            hours
          </Typography>
        </Card>
        <Card sx={ cardStyle } raised>
          <Typography variant="h6">
            { timerItems.minutes }
          </Typography>
          <Typography variant="h6">
            min
          </Typography>
        </Card>
        <Card sx={ cardStyle } raised>
          <Typography variant="h6">
            { timerItems.seconds }
          </Typography>
          <Typography variant="h6">
            sec
          </Typography>
        </Card>
      </Box>
      <Box className={classes.icon}>
        {editTimer && (
          <Box onClick={editTimer}>
            <IconButton>
              <BorderColorIcon fontSize="large" />
            </IconButton>
          </Box>
        )}
        {deleteTimer && (
          <Box onClick={deleteTimer}>
            <IconButton>
              <DeleteForeverIcon fontSize="large" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default memo(CoolDown);