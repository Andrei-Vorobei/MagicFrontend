import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => {
  return {
    codeButton: {
      paddingTop: 16,
      display: 'flex',
      justifyContent: 'end'
    },
    img: {
      display: 'block',
    },
  }
});

type CodeModalType = {
  codeImg: string;
}

export const CodeModal: React.FC<CodeModalType> = ({
  codeImg
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className={classes.codeButton}>
      <Button
        variant="outlined"
        onClick={() => setIsOpen(true)}
      >
        Показать код
      </Button>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          maxWidth={false}
        >
          <DialogTitle>
            Имплементация
          </DialogTitle>
          <DialogContent>
            <img src={codeImg} className={classes.img} />
          </DialogContent>
        </Dialog>
    </Box>
  );
};
