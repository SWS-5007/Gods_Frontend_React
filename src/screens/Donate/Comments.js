import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import {
  getAllDonorsComments,
  createDonorsComments,
} from "../../redux/actions/donors-comment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Comments() {
  const { loading, error, donorsComments, donorComment } = useSelector(
    (state) => {
      console.log("Typical", state);
      return state.DonorsComments;
    }
  );
  const dispatch = useDispatch();
  const [textComment, setTextComment] = useState("");

  useEffect(() => {
    dispatch(getAllDonorsComments());
  }, [dispatch]);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    if (textComment.trim().length > 1) {
      const data = {
        content: textComment.trim(),
        user_name: "Well wisher",
        organisations_name: "giving-children-education",
        organisations_id: 1,
      };

      dispatch(createDonorsComments(data));
      setTextComment("");
    }
  };
  return (
    <Box>
      <Typography variant="h5" component={"h5"} align="center">
        Donor's Comments
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={3} sx={{ placeItems: "center" }}>
        <Grid item xs={10}>
          <TextField
            value={textComment}
            onChange={(event) => {
              setTextComment(event.target.value);
            }}
            placeholder="Write your comment here"
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            onClick={handleSubmitComment}
            size="large"
            fullWidth
          >
            Post
          </Button>
        </Grid>
      </Grid>
      {loading ? (
        <CircularProgress />
      ) : donorsComments?.length === 0 ? (
        <Typography>There's no comment here.</Typography>
      ) : (
        donorsComments?.map((comment, i) => (
          <Grid
            container
            spacing={5}
            sx={{ mt: 1, placeItems: "center" }}
            key={i}
          >
            <Grid item xs={2}>
              <AccountCircle sx={{ fontSize: "3em" }} color="tertiary" />
            </Grid>
            <Grid item xs={10}>
              <Box sx={{ display: "flex", placeItems: "center", mb: 2 }}>
                <Typography variant="h6" marginRight={2} fontWeight={900}>
                  {comment.user_name}
                </Typography>
                <Typography color={"text.tertiary"}>
                  {dayjs(comment.created_at).fromNow()}
                </Typography>
              </Box>
              <Typography>{comment.content}</Typography>
            </Grid>
          </Grid>
        ))
      )}
    </Box>
  );
}
