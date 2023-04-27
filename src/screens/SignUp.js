import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';
import Container from '@mui/material/Container';
import Image from 'mui-image';
import SectionHeading from '../components/SectionHeading';
import InputIcon from '../components/InputIcon';
import LoginBg from '../assets/backgrounds/login.png';
import useToast from '../hooks/useToast';
import { register } from '../api/endpoints/auth';
import axios from '../api/axios';

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [country, setCountry] = useState('')
    const [telephone, setTelephone] = useState('')
    const { toast } = useToast({
        config: {
            loading: "Signing up...",
            error: "Sign up failed",
            success: "User has been registered!"
        }
    })
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const promise = axios(
            register({
                name,
                email,
                password,
                country,
                telephone,
            })
        )
        toast(promise)
        const res = await promise
        if(res.status === 200){
            navigate('/login')
        } else {
            // TODO: Handle sign up error
        }
    };

    return (
        <Container maxWidth={'lg'} sx={{ height: '100vh', display: 'flex' }}>
            <Link 
                href="/" 
                color="body.main"
                sx={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                }}
                title="Back to home page"
            >
                <HomeIcon />
            </Link>
            <Grid container sx={{ alignItems: 'center' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={6}
                    sx={{
                        textAlign: 'center',
                        px: 8,
                    }}
                >
                    <Image src={LoginBg} alt="login" duration={0} />
                    <Link href="/login" color="body.main">
                        {"Log in"}
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                        }}
                    >
                        <SectionHeading>
                            Sign up
                        </SectionHeading>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Box sx={{ my: 4, mr: { md: 16 } }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    placeholder="Your Name"
                                    name="name"
                                    variant="standard"
                                    InputProps={{
                                        startAdornment: (
                                            <InputIcon>
                                                <PersonIcon />
                                            </InputIcon>
                                        ),
                                    }}
                                    inputProps={{
                                        maxLength: 17,
                                    }}
                                    value={name}
                                    onChange={e => setName(e?.target?.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder="Your Email"
                                    name="email"
                                    variant="standard"
                                    InputProps={{
                                        startAdornment: (
                                            <InputIcon>
                                                <MailIcon />
                                            </InputIcon>
                                        ),
                                    }}
                                    value={email}
                                    onChange={e => setEmail(e?.target?.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="tel"
                                    placeholder="Telephone"
                                    name="tel"
                                    variant="standard"
                                    InputProps={{
                                        startAdornment: (
                                            <InputIcon>
                                                <LocalPhoneIcon />
                                            </InputIcon>
                                        ),
                                    }}
                                    inputProps={{
                                        maxLength: 13,
                                    }}
                                    value={telephone}
                                    onChange={e => setTelephone(e?.target?.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="country"
                                    placeholder="Country"
                                    name="country"
                                    variant="standard"
                                    InputProps={{
                                        startAdornment: (
                                            <InputIcon>
                                                <PublicIcon />
                                            </InputIcon>
                                        ),
                                    }}
                                    value={country}
                                    onChange={e => setCountry(e?.target?.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    id="password"
                                    InputProps={{
                                        startAdornment: (
                                            <InputIcon>
                                                <LockIcon />
                                            </InputIcon>
                                        ),
                                    }}
                                    variant="standard"
                                    sx={{ mt: 2 }}
                                    inputProps={{
                                        maxLength: 16,
                                    }}
                                    value={password}
                                    onChange={e => setPassword(e?.target?.value)}
                                />
                            </Box>
                            <Box>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        textTransform: 'none',
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}