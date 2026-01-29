import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import { CodeModal } from "../CodeModal";
import { Buttons } from "./Buttons";
import { useCount } from "./useCount";
import codeImg from './code.png';

const useStyles = makeStyles((theme) => {
  return {
    buttonBlock: {
      display: 'flex',
      gap: 20,
      flexDirection: 'column'
    },
    buttons: {
      display: 'flex',
      gap: 20
    },
    content: {
      display: 'flex',
    },
    count: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
  }
});

export const Increment: React.FC = () => {
  const classes = useStyles();

  const {
    increment,
    decrement,
    reset,
    count
  } = useCount(0);

  return (
    <Box>
      <Box pb={2}>
        <Typography variant="h5">Инкремент/Декремент</Typography>
      </Box>
      <Box className={classes.content}>
        <Buttons increment={increment} decrement={decrement} reset={reset} />
        <Box className={classes.count}>
          <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{count}</Typography>
        </Box>
      </Box>
      <CodeModal codeImg={codeImg} />
    </Box>
  );
};
