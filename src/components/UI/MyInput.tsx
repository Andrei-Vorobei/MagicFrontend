import { ChangeEvent, useRef } from "react";
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';


export const MyInput: React.FC<TextFieldProps> = (props) => {
  const {
    onChange,
    value,
    ...inputProps
  } = props;
  const inputRef = useRef(null);

  const clear = () => {
    onChange({ target: {value: '' }} as ChangeEvent<HTMLInputElement>);
    inputRef.current.focus();
  };

  return (
    <TextField
      size='small'
      inputRef={inputRef}
      onChange={onChange}
      value={value}
      slotProps={{
        input: {
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton><ClearIcon onClick={clear} /></IconButton>
            </InputAdornment>
          )
        }
      }}
      {...inputProps}
    />
  )
};