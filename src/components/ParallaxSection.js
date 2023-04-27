import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const ParallaxBg = styled(Box, {
    shouldForwardProp: (prop) => prop !== "backgroundImage"
})(({ backgroundImage }) => ({
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    boxSizing: 'border-box',
    width: '100vw',
    position: 'relative',
    '&:after': {
        content: '" "',
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, .65)',
    },
    '> .MuiTypography-root, > .MuiGrid-root, > .MuiContainer-root': {
        position: 'relative',
        zIndex: 1,
    }
}))

export default function ParallaxSection({ children, backgroundImage = '' }) {
    return (
        <ParallaxBg backgroundImage={backgroundImage}>
            {children}
        </ParallaxBg>
    )
}