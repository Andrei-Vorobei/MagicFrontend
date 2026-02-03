import { ChangeEvent, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import codeImg from './image.png';
import { MyInput } from "../UI/MyInput";
import { CodeModal } from "../CodeModal";

export const Anagram: React.FC = () => {
  const [string1, setString1] = useState('');
  const [string2, setString2] = useState('');
  const [isAnagram, setIsAnagram] = useState(false);
  const [isError, setIsError] = useState(false);

  const strNormalize = (str: string) => {
    return str.toLowerCase().replace(/[^a-zа-я0-9]/g, '').split('').sort().join('');
  };

  useEffect(() => {
    const isAnagram = strNormalize(string1) === strNormalize(string2);
    const isError = string1 && string2 && !isAnagram;
    setIsError(isError);
    setIsAnagram(isAnagram);
  }, [string1, string2]);
  
  return (
    <Box>
      <Box pb={2}>
        <Typography variant="h4">
          Анаграмма
        </Typography>
      </Box>
      <Box pb={2}>
        <MyInput
          value={string1}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setString1(e.target.value)}
          placeholder="Вставьте строку"
          fullWidth
          label={string1 && 'Первая строка'}
          error={isError}
        />
      </Box>
      <Box>
        <MyInput
          value={string2}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setString2(e.target.value)}
          placeholder="Вставьте строку"
          fullWidth
          label={string2 && 'Вторая строка'}
          error={isError}
        />
      </Box>
      <Box pt={2}>
        <Typography
          sx={{ fontWeight: 'bold' }}
          color={isError ? 'error' : (string1 && string2) ? 'success' : 'textPrimary'}
          variant="h5"
        >
          {isError
            ? 'Строки не являются анаграммой'
            : (string1 && string2)
            ? 'Строки являются анаграммой'
            : 'Введите обе строки'}
        </Typography>
      </Box>
      <CodeModal codeImg={codeImg} />
    </Box>
  );
};