import { useState, useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InnerPage from "../components/InnerPage";
import SectionHeading from "../components/SectionHeading";
import { addVolunteer, getVolunteer } from "../api/endpoints/volunteer";
import axios from "../api/axios";
import useToast from "../hooks/useToast";
import { chunkArray } from "../utils/array";
import { uuidv4 } from "../utils/uuid";

const VolunteerForm = ({ onAdd }) => {
  const { toast } = useToast({
    config: {
      loading: "Adding volunteer...",
      error: "Failed on adding volunteer",
      success: (resp) => resp?.data?.message,
    },
    options: { id: "volunteer-add" },
  });
  const initState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    description: "",
  };
  const [formData, setFormData] = useState(initState);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { firstName, lastName, email, phone, country, description } = formData;
  const addVolunteerData = async () => {
    const formValid =
      formData.firstName.length > 0 &&
      formData.lastName.length > 0 &&
      formData.email.length &&
      formData.phone.length > 0 &&
      formData.description.length > 0;

    if (formValid) {
      const promise = axios(addVolunteer(formData));
      toast(promise);
      const res = await promise;
      const { data } = res;
      if (res.status === 200) {
        try {
          // Append the newly added volunteer to the list, then
          // clear the form data
          //onAdd(data?.volunteer);
          setFormData({ ...initState });
        } catch {}
      } else {
        // TODO: Handle volunteer loading error
      }
    }
  };

  return (
    <InnerPage maxWidth="lg">
      <Box sx={{ mt: -6 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={8} columns={16}>
            <Grid item md={8}>
              <SectionHeading
                sx={{ mb: 4, color: "primary.main" }}
                variant="h4"
              >
                General volunteer interest.
              </SectionHeading>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                Looking for more ways to volunteer with us? Submit a general
                interest form and let us know what type of volunteer
                opportunities you’d like to bring to The Gods Hand!.
              </Typography>
            </Grid>
            <Grid item md={8}>
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={"First Name"}
                      name={"firstName"}
                      value={firstName}
                      onChange={handleChange}
                      sx={{
                        bgcolor: "background.gray",
                        textTransform: "capitalize",
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label={"Last Name"}
                      name={"lastName"}
                      value={lastName}
                      onChange={handleChange}
                      sx={{
                        bgcolor: "background.gray",
                        textTransform: "capitalize",
                      }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <TextField
                  label={"Email"}
                  name={"email"}
                  value={email}
                  onChange={handleChange}
                  sx={{
                    bgcolor: "background.gray",
                    textTransform: "capitalize",
                    mt: 3,
                  }}
                  fullWidth
                />
                <TextField
                  label={"Phone"}
                  name={"phone"}
                  value={phone}
                  onChange={handleChange}
                  sx={{
                    bgcolor: "background.gray",
                    textTransform: "capitalize",
                    mt: 3,
                  }}
                  fullWidth
                />
                <TextField
                  label={"Country"}
                  name={"country"}
                  value={country}
                  onChange={handleChange}
                  sx={{
                    bgcolor: "background.gray",
                    textTransform: "capitalize",
                    mt: 3,
                  }}
                  fullWidth
                />
                <TextField
                  label={
                    "Let us know what volunteer opportunities you're interested in"
                  }
                  name={"description"}
                  value={description}
                  onChange={handleChange}
                  multiline
                  rows={5}
                  sx={{ bgcolor: "background.gray", mt: 3 }}
                  fullWidth
                />
              </Box>
              <Button
                variant="contained"
                size="large"
                onClick={() => addVolunteerData()}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </InnerPage>
  );
};

const volunteerData = [
  {
    id: 1,
    firstName: "Maria",
    lastName: "",
    country: "",
    description: `I’m maria. I am a student in Lebanon. I’ve done a 2 month long internship with
    The Gods Hand. I volunteered for the organisation called “No For Drugs”. I
    helped them in raising funds for this organisation and I raised $1500 for them in
    2 months. I learned a lot of things from this work. I really enjoyed working with
    The Gods Hand.`,
  },
  {
    id: 2,
    firstName: "Ankit",
    lastName: "S.",
    country: "",
    description: `I really liked the concept of The God's Hand, i.e., helping different non-profits
    from all around the world, and that’s why I volunteered with them and helped
    them raise funds for different non-profits from all around the world.`,
  },
  {
    id: 3,
    firstName: "Sharon",
    lastName: "W.",
    country: "",
    description: `Teaching at the orphanage in collaboration with The Gods Hand has been the
    highlight of my time. The freedom they gave me to utilise my experience made
    me feel valued as an individual. The most rewarding aspect, though, was seeing
    the pleasure on the students faces.`,
  },
  {
    id: 4,
    firstName: "Juhi",
    lastName: "G.",
    country: "",
    description: `I had a great experience working with The Gods Hand for my one-month
    internship. This was my first exposure to the real corporate world and a
    great learning experience. I met some really wonderful people who
    inspired me to push my limits. They taught me to think about society first
    and myself later.`,
  },
];

export default function Volunteer() {
  const [volunteer, setVolunteer] = useState(volunteerData);
  const { toast } = useToast({
    config: {
      loading: "Fetching volunteer...",
      error: "Failed on fetching volunteer",
      success: "Volunteer loaded",
    },
    options: { id: "volunteer" },
  });
  useEffect(() => {
    let loaded = false;
    const getVolunteerList = async () => {
      const promise = axios(getVolunteer());
      toast(promise);
      const res = await promise;
      // const { data } = res
      if (res.status === 200) {
        try {
          // TODO: Update real volunteer content from dashboard
          setVolunteer(volunteerData);
        } catch {}
      } else {
        // TODO: Handle volunteer loading error
      }
    };

    if (volunteer.length === 0 && !loaded) {
      getVolunteerList();
    }
    return () => {
      loaded = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list = useMemo(() => {
    const columns = 2;
    return chunkArray(volunteer, columns);
  }, [volunteer]);

  return (
    <>
      <Box sx={{ backgroundColor: "background.main" }}>
        <InnerPage maxWidth="md">
          <Box sx={{ mb: 0 }}>
            <SectionHeading sx={{ textAlign: "center", mb: 4 }}>
              Why volunteer with us?
            </SectionHeading>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.6, textAlign: "center" }}
              >
                According to The Gods Hand, long-term change cannot occur unless
                members of civil society are actively participating in the
                development process. We welcome and ask people to sign up for
                volunteer opportunities, be an active member of our
                organisation, and share our mission with everyone.
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.6, textAlign: "center", mt: 1 }}
              >
                <em>
                  Every organisation relies on its volunteers since they not
                  only hold the organisation's beliefs within them but also
                  spread the word widely, bringing attention to the cause. Give
                  back by serving others and volunteering with us.
                </em>
              </Typography>
            </Box>
          </Box>
        </InnerPage>
      </Box>
      <InnerPage maxWidth="md">
        <Box>
          <SectionHeading
            sx={{ textAlign: "center", mb: 4, color: "primary.main" }}
          >
            What Volunteers Are Saying:
          </SectionHeading>
          {list.map((listItem, index) => {
            return (
              <Box sx={{ flexGrow: 1, mt: index > 0 ? 8 : 0 }} key={index}>
                <Grid
                  container
                  spacing={8}
                  columns={16}
                  sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
                >
                  {listItem.map((v) => (
                    <Grid item md={8} key={v.id}>
                      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                        “{v.description}”
                      </Typography>
                      <Typography
                        variant="body1"
                        color="primary.main"
                        sx={{ mt: 2 }}
                      >
                        <span dangerouslySetInnerHTML={{ __html: "&#45;" }} />{" "}
                        {v.firstName}
                        {v.lastName ? ` ${v.lastName}` : ""}
                        {v.country ? `, ${v.country}` : ""}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
          })}
        </Box>
      </InnerPage>
      <VolunteerForm
        onAdd={(newVolunteer) => {
          setVolunteer([
            ...volunteer,
            {
              ...newVolunteer,
              id: uuidv4(),
            },
          ]);
        }}
      />
    </>
  );
}
