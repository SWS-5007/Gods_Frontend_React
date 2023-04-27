import PropTypes from 'prop-types';
import { useSignOut } from 'react-auth-kit'
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import axios from '../../api/axios';
import { logout } from '../../api/endpoints/auth';

export const AccountPopover = props => {
  const { anchorEl, onClose, open, ...other } = props;
  const signOut = useSignOut();
  const onSignOut = async () => {
    // Hit the logout API,
    await axios(
      logout()
    )
    // then clear authentication store
    signOut()
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant='overline'>Account</Typography>
        <Typography color='text.secondary' variant='body2'>
          Admin
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px',
            },
            padding: '12px 16px',
          },
        }}
      >
        <MenuItem onClick={onSignOut}>Logout</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
