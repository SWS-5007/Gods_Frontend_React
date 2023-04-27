import InputAdornment from '@mui/material/InputAdornment';

export default function InputIcon({ children, ...props }) {
    return (
        <InputAdornment 
            position="start" 
            sx={{ color: theme => theme.palette.body.main }}
            {...props}
        >
            { children }
        </InputAdornment>
    )
}