import { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/system';
import InnerPage from '../components/InnerPage';
import useToast from '../hooks/useToast';
import { getTeams } from '../api/endpoints/teams';
import axios from '../api/axios';

const ModalBody = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    backgroundColor: theme.palette.background.default,
    outline: 'none',
    [theme.breakpoints.up('md')]: {
        width: 600,
    }
}))

const TeamItem = styled(ImageListItem)(() => ({
    cursor: 'pointer',
}))

export default function OurTeam() {
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const [detail, setDetail] = useState(false)
    const [teams, setTeams] = useState([])
    const { toast } = useToast({
        config: { 
            loading: 'Fetching teams...', 
            error: 'Failed on fetching teams', 
            success: 'Teams loaded',
        },
        options: { id: 'tams' },
    })
    useEffect(() => {
        let loaded = false
        const getTeamsList = async () => {
            const promise = axios(
                getTeams()
            )
            toast(promise)
            const res = await promise
            const { data } = res
            if (res.status === 200) {
                try {
                    setTeams(data?.members || [])
                } catch { }
            } else {
                // TODO: Handle teams loading error
            }
        };

        if (teams.length === 0 && !loaded) {
            getTeamsList()
        }
        return () => {
            loaded = true
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <InnerPage maxWidth="lg">
            <ImageList sx={{ width: '100%', height: 'auto' }} cols={isDesktop ? 4 : 1} gap={16}>
                {teams.map((team) => (
                    <TeamItem key={team.id} onClick={() => setDetail(team)}>
                        <img
                            src={`/${team.photo}?w=248&h=248&fit=crop&auto=format`}
                            srcSet={`/${team.photo}?w=248&h=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={team.name}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={team.name}
                            subtitle={team.job_role}
                        />
                    </TeamItem>
                ))}
            </ImageList>
            <Modal
                open={!!detail}
                onClose={() => setDetail(false)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <ModalBody sx={{ px: 4, py: 2 }}>
                    <Typography variant="h4">{detail?.name}</Typography>
                    <Typography variant="body2" sx={{ pt: 2 }}>
                        <span dangerouslySetInnerHTML={{__html: detail?.description }} />
                    </Typography>
                </ModalBody>
            </Modal>
        </InnerPage>
    );
}
