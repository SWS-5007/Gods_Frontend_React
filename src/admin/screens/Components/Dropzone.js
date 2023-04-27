import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';

const getColor = props => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px',
  borderWidth: '2px',
  borderRadius: '10px',
  borderColor: props => getColor(props),
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '1.4rem',
  outline: 'none',
  transition: 'border 0.24s ease-in-out',
}));

function DropBox({ onDrop, files, setFiles }) {
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const handleItemRemove = file => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  return (
    <>
      <Container
        className='dropbox'
        {...getRootProps({ isDragAccept, isFocused, isDragReject })}
      >
        <input {...getInputProps()} />
        <Typography gutterBottom>{"Drag 'n' drop files to attach"}</Typography>
        <Button size='small' variant='contained' onClick={open}>
          select files
        </Button>
      </Container>

      <Box>
        <Grid container>
          <Grid item xs={12} md={12}>
            {acceptedFiles.length !== 0 ? (
              <Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
                Selected Files
              </Typography>
            ) : null}

            <List>
              {files?.map((file, idx) => (
                <ListItem
                  key={file?.path}
                  secondaryAction={
                    <IconButton
                      onClick={() => handleItemRemove(idx)}
                      edge='end'
                      aria-label='delete'
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <AttachFileIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={file?.path}
                    secondary={`${Math.round((file?.size || 0) / 1024)} KB`}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default DropBox;
