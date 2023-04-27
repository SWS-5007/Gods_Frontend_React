export const getOrganizations = (params) => {
    return {
        url: `/api/organization`,
        method: 'GET',
        params,
    }
}

export const getOrganizationOne = (id) => {
    return {
      url: `/organization/${id}`,
      method: 'GET',
    //   params,
    };
};

export const updateOrganizationOne = ({id, data}) => {
    return {
        url: `/api/organization/update/${id}`,
        method: 'POST',
        data
    }
}