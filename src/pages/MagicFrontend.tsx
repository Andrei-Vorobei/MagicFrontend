import { Box, CSSProperties, Paper } from "@mui/material";
import { Increment } from '@/components/Increment/Increment';
import { Palindrome } from "@/components/Palindrome/Palindrome";
import { Timer } from "@/components/Timer/Timer";
import { StringReverse } from "@/components/StringReverse/StringRevers";
import { Anagram } from "@/components/Anagrom/Anagram";

export const MagicFrontend: React.FC = () => {
  const home: CSSProperties = {
    height: '100%',
    padding: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  };

  const paper: CSSProperties = {
    padding: 2,
  }

  return (
    <Box sx={ home }>
      <Paper elevation={5} sx={ paper }>
        <Timer />
      </Paper>
      <Paper elevation={5} sx={ paper }>
        <Increment />
      </Paper>
      <Paper elevation={5} sx={ paper }>
        <Palindrome />
      </Paper>
      <Paper elevation={5} sx={ paper }>
        <StringReverse />
      </Paper>
      <Paper elevation={5} sx={ paper }>
        <Anagram />
      </Paper>
    </Box>
  )
};

export default MagicFrontend;