import {
  Box,
  Typography,
  LinearProgress,
  linearProgressClasses,
  styled,
} from '@mui/material';

export default function DonateProgress({ donated, target }) {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));
  return (
    <>
      <BorderLinearProgress
        variant='determinate'
        value={target == 0 ? 0 : (donated / target) * 100}
      />
      <Box
        sx={{
          width: 200,
          display: 'flex',
          justifyContent: 'space-between',
          mt: 3,
        }}
      >
        <Typography>Donation:</Typography>
        <Typography color={'text.tertiary'}>${donated}</Typography>
        <Typography color={'text.secondary'}>/ ${target}</Typography>
      </Box>
    </>
  );
}
