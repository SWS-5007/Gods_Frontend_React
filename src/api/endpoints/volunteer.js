export const getVolunteer = (params) => {
  return {
    url: `/api/volunteer/request`,
    method: "GET",
    params,
  };
};

export const addVolunteer = (data) => {
  return {
    url: `/api/volunteer/request/add`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  };
};
