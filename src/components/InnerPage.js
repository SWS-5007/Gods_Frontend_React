import Container from "@mui/material/Container"

export default function InnerPage({ children, ...props  }) {
    return (
        <Container maxWidth="md" sx={{ py: { xs: 2, md: 12 } }} {...props}>
            { children }
        </Container>
    )
}