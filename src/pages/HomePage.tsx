import { makeStyles } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Increment } from '@/components/Increment/Increment';
import { Palindrome } from "@/components/Palindrome/Palindrome";

const useStyles = makeStyles((theme) => {
  return {
    home: {
      height: '100%',
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    },
    paper: {
      padding: 15,
    },
  }
});

export const HomePage: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.home}>
      <Paper elevation={5} classes={{ root: classes.paper }}>
        <Increment />
      </Paper>
      <Paper elevation={5} classes={{ root: classes.paper }}>
        <Palindrome />
      </Paper>
    </Box>
  )
};