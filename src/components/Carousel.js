import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { styled } from '@mui/system';

const StyledSwipper = styled(Swiper)(({ theme }) => ({
    '&:hover': {
        '.swiper-button-next, .swiper-button-prev': {
            backgroundColor: theme.palette.primary.contrastText,
        }
    },
    '.swiper-button-next, .swiper-button-prev': {
        padding: '20px',
    },
}))

export default function Carousel({ items = [], renderItem, ...props }) {
    return (
        <StyledSwipper navigation={true} modules={[Navigation]} loop {...props}>
            {
                items.map((item, index) => (
                    <SwiperSlide key={item.id || index}>
                        {renderItem(item)}
                    </SwiperSlide>
                ))
            }
        </StyledSwipper>
    );
}
