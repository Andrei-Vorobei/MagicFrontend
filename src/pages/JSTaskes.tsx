import { Box, Typography } from "@mui/material"

import * as taskes from '@/components/consoleTaskes';

export const JSTaskes: React.FC = () => {
  const toConsole = taskes.averageVal([1, 2, 3, 4, 5])
  console.log('Среднее значение: ', toConsole);

  return (
    <Box height={'100%'}>
      <Typography variant="h1">
        TEST
        {  }
      </Typography>
    </Box>
  )
};

export default JSTaskes;