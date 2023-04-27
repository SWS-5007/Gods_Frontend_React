import { useNavigate } from "react-router-dom";
import { Button, Box, Container, Grid, Typography } from "@mui/material";
import { CreditCard, BookOnline, Share } from "@mui/icons-material";
import ReactPlayer from "react-player";
import DonateProgress from "./DonateProgress";
import DonorList from "./DonorList";
import BottomTabs from "./BottomTabs";
import UpiPayDialog from "../../components/UpiPayDialog";
import { getOrganizationOne } from '../../api/endpoints/organization';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useToast from '../../hooks/useToast';

export default function DonateSingle({ slug }) {
  const [organization, setOrganization] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast({
    config: { 
        loading: 'Fetching organizations...', 
        error: 'Failed on fetching organizations', 
        success: 'Organizations loaded',
    },
    options: { id: 'tams' },
})
  useEffect(() => {
    const getOrganization = async () => {
      const promise = axios(
        getOrganizationOne(slug)
      )
      toast(promise)
      const res = await promise
      console.log(res);
      const { data } = res
      if (res.status === 200) {
          try {
            var org = data.data;
            var donated = 0;
            var required = 0;
            if (org.hasOwnProperty('fundraisers')) {
              org.fundraisers.forEach(element1 => {
                required = required + parseInt(element1.target);
                donated = donated + parseInt(element1.amount_raised);
              });
            }
            org.amountDonated = donated;
            org.amountRequired = required;
            setOrganization(org || []);
            setLoaded(true);
          } catch { }
        } else {
          // TODO: Handle teams loading error
      }
    }

    getOrganization();
  }, [])

  return (
    <Container sx={{ mb: 3 }}>
      <Typography variant='h4' align='center' sx={{ my: 5 }}>
        Sample donation page for: {organization.about}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <ReactPlayer
            width="100%"
            height=""
            playing={true}
            muted={true}
            controls={true}
            url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
          />
          <Box sx={{ textAlign: "right" }}>
            <Button variant="outlined">
              <Share />
              Share this fundraiser page
            </Button>
          </Box>
          <BottomTabs org={organization} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => navigate(`/checkout/${slug}`)}
          >
            Donate Now
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              //mx: 'auto',
              my: 2,
            }}
          >
            <Button variant="outlined">
              <CreditCard />
              Debit / Credit Card
            </Button>
            <UpiPayDialog />
          </Box>
          <DonateProgress donated={organization.amountDonated} target={organization.amountRequired} />
          <DonorList fundraiser_id={slug} />
        </Grid>
      </Grid>
    </Container>
  );
}
