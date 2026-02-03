import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Box, Button, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { MyInput } from "../UI/MyInput";
import { CodeModal } from "../CodeModal";
import codeImg from './image.png';
import { CSSProperties } from "@mui/styles";

export const Palindrome: React.FC = () => {
  const [string, setString] = useState('A man, a plan, a canal: Panama');
  const [cleaned, setCleaned] = useState('');
  const [isPalindrome, setIsPalindrome] = useState(false);
  const [palindromeList, setPalindromeList] = useState<string[]>([]);

  // const checkPalindrome = useMemo(() => {
  //   const cleaned = string.toLowerCase().replace(/[^a-zа-я0-9]/g, '');
  //   setCleaned(cleaned);
  //   return cleaned === cleaned.split('').reverse().join('');
  // }, [string]);

  const checkPalindrome = useMemo(() => {
    const cleaned = string.toLowerCase().replace(/[^a-zа-я0-9]/g, '');
    setCleaned(cleaned);
    for (let i = 0; i < Math.floor(cleaned.length / 2); i++) {
      if (cleaned[i] !== cleaned[cleaned.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }, [string]);

  useEffect(() => {
      setIsPalindrome(checkPalindrome);
  }, [checkPalindrome]);

  const deletePalindromeItem = (indx: number) => {
    setPalindromeList(state => {
      const newState = [...state];
      newState.splice(indx, 1);
      return newState;
    });
  };

  const stringBlock: CSSProperties = {
    padding: 1,
    backgroundColor: '#d3d3d39c',
  };

  const buttonsBlock: CSSProperties = {
    display: 'flex',
    gap: 2,
    paddingTop: 2,
  };

  return (
    <Box>
      <Typography variant="h4">Проверка строки на палиндром</Typography>
      <Box pt={1}>
        <MyInput
          label={string && 'Palindrom'}
          placeholder='Введите строку для проверки'
          fullWidth
          value={string}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setString(e.target.value)}
          error={!isPalindrome}
          helperText={!isPalindrome && 'Строка не является палиндромом'}
        />
      </Box>
      <Box sx={ buttonsBlock }>
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
          <Box sx={ stringBlock }>
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
                  <Typography variant="h6">
                    {item}
                  </Typography>
                </ListItemText>
                <IconButton
                  edge="end"
                  onClick={() => deletePalindromeItem(indx)}
                >
                  <DeleteForeverIcon fontSize="large" />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      <CodeModal codeImg={codeImg} />
    </Box>
  );
};