export const getNews = params => {
  return {
    url: `/news`,
    method: 'GET',
    params,
  };
};

export const getNewsDetail = ({ id, params }) => {
  return {
    url: `/news/${id}`,
    method: 'GET',
    params,
  };
};
