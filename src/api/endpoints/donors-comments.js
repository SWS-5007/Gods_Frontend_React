export const submitDonorsComment = (data) => {
  return {
    url: `/api/donorsComments/add`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  };
};

export const getDonorsComments = () => {
  return {
    url: `/api/donorsComments/`,
    method: "GET",
  };
};
