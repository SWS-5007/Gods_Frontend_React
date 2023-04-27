export const getTeams = (params) => {
    return {
        url: `/api/teams`,
        method: 'GET',
        params,
    }
}