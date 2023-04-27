import { useState } from "react";
import {
  Container,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { AlternateEmail, Phone } from "@mui/icons-material";
import { doContactUs } from "../redux/actions/contact";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initState = {
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  };
  const [formData, setFormData] = useState(initState);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { name, email, phone, country, message } = formData;

  const fields = [
    {
      name: "name",
      type: "text",
      value: name,
    },
    {
      name: "email",
      type: "email",
      value: email,
    },
    {
      name: "phone",
      type: "text",
      value: phone,
    },
    {
      name: "country",
      type: "text",
      value: country,
    },
  ];

  const handleFormSubmit = async (event) => {
    const formValid =
      formData.name.length > 0 &&
      formData.email.length > 0 &&
      formData.phone.length &&
      formData.country.length > 0 &&
      formData.message.length > 0;

    if (formValid) {
      const promise = dispatch(
        doContactUs({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          message: formData.message,
        })
      );
      const res = await promise;
      if (res.status === 200) {
        console.log(res);
        setFormData({
          name: "",
          email: "",
          phone: "",
          country: "",
          message: "",
        });
        setIsEmailSent(true);
      }
    }
  };

  return (
    <Container sx={{ width: "90%", mx: "auto", my: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={8}>
          {isEmailSent && (
            <Typography sx={{ py: 3 }}>
              Message delivered successfuly.
            </Typography>
          )}
          {!isEmailSent && (
            <>
              <Typography variant="h3" fontWeight={900}>
                Send Message
              </Typography>
              <Typography sx={{ py: 3 }}>
                Send us a message by filling out the form below and we’ll be in
                touch soon.
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={3}>
                  {fields.map((field, i) => {
                    return (
                      <Grid item xs={12} sm={6} key={i}>
                        <TextField
                          label={field.name}
                          name={field.name}
                          value={field.value}
                          onChange={handleChange}
                          sx={{
                            bgcolor: "background.gray",
                            textTransform: "capitalize",
                          }}
                          fullWidth
                        />
                      </Grid>
                    );
                  })}
                </Grid>
                <TextField
                  label={"Message"}
                  name={"message"}
                  value={message}
                  onChange={handleChange}
                  multiline
                  rows={5}
                  sx={{ bgcolor: "background.gray", mt: 3 }}
                  fullWidth
                />
              </Box>
              <Button
                onClick={handleFormSubmit}
                variant="contained"
                size="large"
              >
                Send Message
              </Button>
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h3" fontWeight={900}>
            Contact Info
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={5}>
              <Grid item xs={2}>
                <AlternateEmail color="primary" />
              </Grid>
              <Grid item xs={10}>
                <Typography>Email</Typography>
                <Typography color={"text.tertiary"}>
                  info@thegodshandonation.org
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={5} sx={{ mt: 2 }}>
              <Grid item xs={2}>
                <Phone color="primary" />
              </Grid>
              <Grid item xs={10}>
                <Typography>Phone</Typography>
                <Typography color={"text.tertiary"}>+91 7820990746</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
