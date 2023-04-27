import Typography from "@mui/material/Typography";

export default function SectionHeading({ children, ...props }) {
    return (
        <Typography variant='h3' fontWeight={900} color="body.main" {...props}>
            {children}
        </Typography>
    )
}