export const donate = (id, data) => {
    console.log(data);
    return {
        url: `/api/fundraiser/donate/${id}`,
        method: 'POST',
        data: {
            firstname: data.firstname,
            lastname: data.lastname,
            amount_donated: data.amount_donated,
            currency: data.currency,
            email: data.email,
            phone: data.phone,
            isAnonymous: data.isAnonymous,
            city: data.city,
            address: data.address,
            state: data.state,
            country: data.country,
        },
    }
}

export const getSupports = (fundraiser_id) => {
    return {
        url: `/fundraiser/${fundraiser_id}/supporters`,
        method: "GET",
    }
}