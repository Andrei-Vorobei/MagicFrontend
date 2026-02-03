import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { MyInput } from "../UI/MyInput";
import { CodeModal } from "../CodeModal";
import codeImg from './image.png';
import { CSSProperties } from "@mui/styles";

const stringBlock: CSSProperties = {
  padding: 1,
  backgroundColor: '#d3d3d39c',
};

export const StringReverse: React.FC = () => {
  const [value, setValue] = useState('');
  const [reversStr, setReversStr] = useState('');

  // const stringRevers = useMemo(() => {
  //   const revers = [];
  //   for (let i = 0; i < value.length; i++) {
  //     revers[i] = value[value.length - 1 - i];
  //   }
  //   return revers.join('');
  // }, [value]);

  const stringRevers = useMemo(() => {
    let reversStr = '';

    for (let i = value.length - 1; i >= 0; i--) {
      reversStr += value[i];
    }

    return reversStr;
  }, [value]);

  useEffect(() => {
    setReversStr(stringRevers);
  }, [stringRevers]);

  return (
    <Box>
      <Box pb={2}>
        <Typography variant="h4">
          Строка наоборот
        </Typography>
      </Box>
      <MyInput
        label={value && 'StringReverse'}
        placeholder="Введите строку"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        fullWidth
      />
      {reversStr && (
        <>
          <Box pt={2}>
            <Typography sx={{ fontWeight: 'bold' }}>
              Результат:
            </Typography>
          </Box>
          <Box sx={ stringBlock }>
            <Typography>
              {reversStr}
            </Typography>
          </Box>
        </>
      )}
      <CodeModal codeImg={codeImg} />
    </Box>
  );
};