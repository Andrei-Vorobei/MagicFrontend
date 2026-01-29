import { ChangeEvent, useRef } from "react";
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';


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
      {...inputProps}
      inputRef={inputRef}
      onChange={onChange}
      value={value}
      InputProps={{
        endAdornment: value && <InputAdornment position="end">
          <IconButton><ClearIcon onClick={clear} /></IconButton>
        </InputAdornment>
      }}
    />
  )
};