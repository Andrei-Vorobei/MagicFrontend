import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

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
  }
});

type ButtonsType = {
  increment: ()=>void;
  decrement: ()=>void;
  reset: ()=>void;
}

export const Buttons: React.FC<ButtonsType> = ({
  increment,
  decrement,
  reset
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.buttonBlock}>
      <Box className={classes.buttons}>
        <Button
          color='primary'
          variant='contained'
          onClick={decrement}
        >
          dec
        </Button>
        <Button
          color='primary'
          variant='contained'
          onClick={increment}
        >
          inc
        </Button>
      </Box>
      <Button
        color='primary'
        variant='contained'
        onClick={reset}
      >
        Reset
      </Button>
    </Box>
  );
};