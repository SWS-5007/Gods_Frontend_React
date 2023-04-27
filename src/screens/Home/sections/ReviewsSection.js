import {
  Box,
  styled,
  CardHeader,
  Card,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material";
import SectionHeading from "../../../components/SectionHeading";
import Carousel from "../../../components/Carousel";
import { chunkArray } from "../../../utils/array";

const sourceReviews = [
  {
    id: 1,
    review: `The God's hands project needs all contributions possible to positively influence
  lives all over the world.`,
    name: "Mitcher G",
  },
  {
    id: 2,
    review: `
  I believe in the work that is being done by The God's hand. I'm happy to
  support them since I know that my gift will touch people's hearts and impact
  lives.`,
    name: "Annifer B",
  },
  {
    id: 3,
    review: `
  God's hand is motivating us to do more to help those in need, showing us that
  there is still more to be done.`,
    name: "Moreen M",
  },
  {
    id: 4,
    review: `
  The God's hand enables people to donate money to organisations that focus on
  a topic they are interested in and reduce social challenges.`,
    name: "Afrim M",
  },
  {
    id: 5,
    review: `
  I am grateful to be able to lend support to any organisation of my choice, and it
  is a great feeling to be part of the God's hand.`,
    name: "Sachin S",
  },
  {
    id: 6,
    review: `
  The God's hand has provided the perfect way for businesses to make the
  change they want to see by donating to a specific organisation and committing
  to follow through with progress.`,
    name: "Yaseer K",
  },
];

export default function ReviewsSection() {
  const Reviews = styled(Box)(() => ({
    backgroundImage: `url('/storage/image/review.jpg')`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    boxSizing: "border-box",
    width: "100vw",
    position: "relative",
    "&:after": {
      content: '" "',
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, .65)",
    },
    "> .MuiTypography-root, > .MuiGrid-root": {
      position: "relative",
      zIndex: 1,
    },
  }));
  const ReviewAuthor = styled(CardHeader)(() => ({
    flexDirection: "row-reverse",
    ".MuiCardHeader-title": {
      fontSize: 16,
    },
  }));
  const allReviews = chunkArray(sourceReviews, 3);
  return (
    <Reviews
      sx={{
        px: { xs: 2, md: 12 },
        py: { xs: 8, md: 12 },
        color: "primary.contrastText",
      }}
    >
      <SectionHeading
        sx={{ color: "primary.contrastText", textAlign: "center" }}
      >
        What People Say
      </SectionHeading>
      <Carousel
        items={allReviews}
        renderItem={(items) => {
          return (
            <Box sx={{ display: "flex", px: { xs: 2, md: 8 } }}>
              {items.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    gap: 4,
                    flexBasis: "33.33%",
                    m: "0 auto",
                    px: { xs: 2, md: 2 },
                  }}
                >
                  <Box sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
                    <Card
                      sx={{
                        py: 3,
                        px: 4,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <CardContent>
                        <Typography variant="body1">{item.review}</Typography>
                      </CardContent>
                      <ReviewAuthor
                        // avatar={
                        //   <Avatar
                        //     alt="Remy Sharp"
                        //     src="/storage/image/avatar.jpg"
                        //   />
                        // }
                        title={item.name}
                        subheader=""
                      />
                    </Card>
                  </Box>
                </Box>
              ))}
            </Box>
          );
        }}
        sx={{ display: { xs: "none", md: "block" } }}
      />
      <Carousel
        items={sourceReviews}
        renderItem={(item) => {
          return (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                gap: 4,
                maxWidth: "lg",
                m: "0 auto",
                px: { xs: 2, md: 12 },
              }}
            >
              <Box sx={{ mt: 4, display: "flex" }}>
                <Card sx={{ py: 3, px: 4, minHeight: 300 }}>
                  <CardContent>
                    <Typography variant="body1">{item.review}</Typography>
                  </CardContent>
                  <ReviewAuthor
                    // avatar={
                    //   <Avatar
                    //     alt="Remy Sharp"
                    //     src="/storage/image/avatar.jpg"
                    //   />
                    // }
                    title={item.name}
                    subheader=""
                  />
                </Card>
              </Box>
            </Box>
          );
        }}
        sx={{ display: { xs: "block", md: "none" } }}
      />
    </Reviews>
  );
}
