import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import { useSignIn } from 'react-auth-kit';
import Image from 'mui-image';
import SectionHeading from '../components/SectionHeading';
import InputIcon from '../components/InputIcon';
import LoginBg from '../assets/backgrounds/login-donate.png';
import { doLogin } from '../redux/actions/auth';

export default function Login() {
    const dispatch = useDispatch()
    const { loading, auth } = useSelector(state => state.auth);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const signIn = useSignIn()
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const promise = dispatch(doLogin({
            email: username,
            password,
            remember_me: remember,
        }))
        const res = await promise
        if(res.status === 200){
            if(
                signIn(
                    {
                        token: res.data.access_token,
                        expiresIn:res.data.expires_in,
                        tokenType: res.data.token_type,
                        authState: res.data.user,
                    }
                )
            ) {
                // navigate(res.data.user.role === 1 ? '/admin' : '/')
                navigate('/admin')
            } else {
                // TODO: Handle login error
            }
        }
    };

    return (
        <Container maxWidth={'lg'} sx={{ height: '100vh', display: { xs: 'block', md: 'flex' } }}>
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
                    <Link href="/signup" color="body.main">
                        {"Create an account"}
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
                            Log in
                        </SectionHeading>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Box sx={{ my: 4, mr: { md: 16 } }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder="Your Name"
                                    name="email"
                                    variant="standard"
                                    InputProps={{
                                        startAdornment: (
                                            <InputIcon>
                                                <PersonIcon />
                                            </InputIcon>
                                        ),
                                    }}
                                    value={username}
                                    onChange={e => setUsername(e?.target?.value)}
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
                                    value={password}
                                    onChange={e => setPassword(e?.target?.value)}
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            value="remember" 
                                            color="primary" 
                                            checked={remember}
                                            onChange={() => setRemember(!remember)}
                                        />
                                    }
                                    label="Remember me"
                                    sx={{ mt: 2 }}
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
                                    Log In
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}