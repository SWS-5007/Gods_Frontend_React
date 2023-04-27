export const submitContactUsForm = (data) => {
  return {
    url: `/api/contact/add`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  };
};
