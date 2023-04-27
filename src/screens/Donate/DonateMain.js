import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import Boy1 from '../../assets/images/boy1.jpg';
import Boy2 from '../../assets/images/boy2.jpg';
import Boy3 from '../../assets/images/boy3.jpg';
import { AccountBalance } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DonateProgress from './DonateProgress';
import { getOrganizations } from '../../api/endpoints/organization';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import useToast from '../../hooks/useToast';

export default function DonateMain() {
  const [organizations, setOrganizations] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { toast } = useToast({
      config: { 
          loading: 'Fetching organizations...', 
          error: 'Failed on fetching organizations', 
          success: 'Organizations loaded',
      },
      options: { id: 'tams' },
  })
  // const items = [
  //   {
  //     title: 'Education for Children',
  //     organization: 'Sample Organization 1',
  //     slug: 'education-for-children',
  //     imgSrc: Boy1,
  //     amountDonated: 5600,
  //     amountRequired: 7000,
  //   }
  // ];

  const navigate = useNavigate();

  useEffect(() => {
    const getOrganizationList = async () => {
      const promise = axios(
          getOrganizations()
      )
      toast(promise)
      const res = await promise
      var { data } = res
      if (res.status === 200) {
          try {
            var orgs = data.data;
            orgs.forEach(element => {
              var donated = 0;
              var required = 0;
              if (element.hasOwnProperty('fundraisers')) {
                element.fundraisers.forEach(element1 => {
                  required = required + parseInt(element1.target);
                  donated = donated + parseInt(element1.amount_raised);
                });
              }
              element.amountDonated = donated;
              element.amountRequired = required;
            });
            console.log(orgs);
            setOrganizations(orgs || []);
            setLoaded(true);
          } catch { }
        } else {
          // TODO: Handle teams loading error
      }
    };

    getOrganizationList();
  }, [])

  return (
    <Grid container spacing={5} sx={{ mt: 2, mb: 5, p: 3 }}>
      {loaded && organizations.map((item, i) => (
        <Grid item xs={12} sm={4} key={i}>
          <Card>
            <CardMedia
              sx={{ height: 200 }}
              // image={item.imgSrc}
              image={Boy2}
              title={item.about}
            />
            <CardContent>
              <Typography gutterBottom variant='h6' component='div'>
                {item.about}
              </Typography>
              <Grid container spacing={5} sx={{ placeItems: 'center', mb: 2 }}>
                <Grid item xs={1}>
                  <IconButton>
                    <AccountBalance />
                  </IconButton>
                </Grid>
                <Grid item xs={10}>
                  <Typography variant='body2' color='text.secondary'>
                    {item.name}
                  </Typography>
                </Grid>
              </Grid>
              <DonateProgress
                donated={item.amountDonated}
                target={item.amountRequired}
              />
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', mb: 2 }}>
              <Button
                variant='outlined'
                onClick={() => navigate(`/donate/${item.id}`)}
              >
                Read More
              </Button>
              <Button variant='contained' onClick={() => navigate(`/checkout/${item.id}`)}>
                Donate Now
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
