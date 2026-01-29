import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { MyInput } from "../UI/MyInput";
import { CodeModal } from "../CodeModal";
import codeImg from './image.png';

const useStyles = makeStyles((theme) => {
  return {
    stringBlock: {
      padding: 8,
      backgroundColor: '#d3d3d39c',
    },
    buttonsBlock: {
      display: 'flex',
      gap: 16,
      paddingTop: 16,
    }
  }
});

export const Palindrome: React.FC = () => {
  const classes = useStyles();
  const [string, setString] = useState('A man, a plan, a canal: Panama');
  const [cleaned, setCleaned] = useState('');
  const [isPalindrome, setIsPalindrome] = useState(false);
  const [palindromeList, setPalindromeList] = useState<string[]>([]);
  

  useEffect(() => {
      // setIsPalindrome(checkPalindrome(string));
      setIsPalindrome(checkPalindromeAlt(string));
  }, [string]);

  function checkPalindrome(str: string) {
    const cleaned = str.toLowerCase().replace(/[^a-zа-я0-9]/g, '');
    setCleaned(cleaned);
    return cleaned === cleaned.split('').reverse().join('');
  }

  function checkPalindromeAlt(str: string) {
    const cleaned = str.toLowerCase().replace(/[^a-zа-я0-9]/g, '');
    setCleaned(cleaned);
    for (let i = 0; i < Math.floor(cleaned.length / 2); i++) {
      if (cleaned[i] !== cleaned[cleaned.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }

  const deletePalindromeItem = (indx: number) => {
    setPalindromeList(state => {
      const newState = [...state];
      newState.splice(indx, 1);
      return newState;
    });
  };

  return (
    <Box>
      <Typography variant="h5">Проверка строки на палиндром</Typography>
      <Box pt={1}>
        <MyInput
          size='small'
          placeholder='Введите строку для прверки'
          fullWidth
          value={string}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setString(e.target.value)}
        />
      </Box>
      <Box className={classes.buttonsBlock}>
        <Button
          variant="contained"
          color="primary"
          disabled={!isPalindrome || !string}
          onClick={() => {
            setPalindromeList(state => ([...state, string]));
            setString('');
          }}
        >
          Добавить
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!palindromeList.length}
          onClick={() => setPalindromeList([])}
        >
          Очистить
        </Button>
      </Box>
      {string && (
        <Box pt={2}>
          <Typography sx={{ fontWeight: 'bold' }}>
            Так выглядет строка наоборот
          </Typography>
          <Box className={classes.stringBlock}>
            <Typography>
              {cleaned}
            </Typography>
          </Box>
        </Box>
      )}
      {!!palindromeList.length && (
        <Box>
          <List>
            {palindromeList.map((item, indx) => (
              <ListItem key={`${item}${indx}`}>
                <ListItemText>
                  {item}
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => deletePalindromeItem(indx)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      <CodeModal codeImg={codeImg} />
    </Box>
  );
};