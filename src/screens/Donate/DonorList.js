import {
  Card,
  Box,
  Typography,
  Divider,
  ButtonGroup,
  Button,
  Grid,
} from "@mui/material";
import { Group, AccountCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from '../../api/axios';
import { getSupports } from "../../api/endpoints/fundraiser";

export default function DonorList({ fundraiser_id }) {
  const [supporters, setSupporters] = useState([]);
  const donors = [
    {
      money: "50,0000",
    },
    {
      money: "40,0000",
    },
    {
      money: "30,0000",
    },
  ];

  useEffect(() => {
    const getSuppoters = async () => {
      const promise = axios(
        getSupports(fundraiser_id)
      )
      // toast(promise)
      const res = await promise
      console.log(res);
      const { data } = res
      if (res.status === 200) {
        try {
          setSupporters(data.data || []);
        } catch {}
      }
      else {
        
      }
    };
    getSuppoters();
  }, []);

  return (
    <Card sx={{ my: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          my: 2,
        }}
      >
        <Group sx={{ mx: 3 }} color="tertiary" />
        <Typography variant="h6" fontWeight={900}>
          {supporters.length} Supporters
        </Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <ButtonGroup>
          <Button variant="contained">Most Generous</Button>
        </ButtonGroup>
      </Box>
      {supporters.map((supporter, i) => (
        <Grid
          container
          spacing={3}
          key={i}
          sx={{ placeItems: "center", textAlign: "center", my: 2 }}
        >
          <Grid item xs={2}>
            <AccountCircle color="tertiary" />
          </Grid>
          <Grid item xs={5}>
            <Typography>{supporter.name}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>${supporter.amount_donated}</Typography>
          </Grid>
        </Grid>
      ))}
    </Card>
  );
}
