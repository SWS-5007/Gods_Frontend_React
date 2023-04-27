import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

const SubHeaderContent = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    py: 12,
    'a': {
        color: theme.palette.primary.contrastText,
        textDecoration: 'none',
    }
}))

export default function SubHeader({ path, children }) {
    return (
        <SubHeaderContent sx={{ py: 2, px: 8 }}>
            <Link to={path}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    { children }
                </Typography>
            </Link>
        </SubHeaderContent>
    )
}