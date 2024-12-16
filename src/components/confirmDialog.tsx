import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmDialog = ({
  open,
  title,
  message,
  onClose,
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialogPaper-root': {
          borderRadius: '12px', 
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', 
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: '1.2rem', 
          fontWeight: 'bold',
           
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          fontSize: '1rem',
          color: '#333', 
          marginBottom: '20px',
        }}
      >
        {message}
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 20px', 
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            borderColor: '#540b0e',
            color: '#540b0e',
            borderRadius: '8px',
            padding: '8px 16px', 
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#f0e1e1', 
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            borderColor: '#540b0e',
            backgroundColor: '#540b0e',
            color: 'white',
            borderRadius: '8px',
            padding: '8px 16px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#8e2e2e', 
            },
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
