import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from '../../api/axios';
import { donate } from '../../api/endpoints/fundraiser';
import useToast from '../../hooks/useToast';

export default function PaymentPaypal({ formData: data, amount: donateAmount, orgID: id }) {
    const { toast, loading } = useToast({
        config: { 
            loading: 'Processing donation...', 
            error: 'Failed on processing donation', 
            success: 'Redirecting to Paypal...',
        },
        options: { id: 'donate' },
    })
    const onSubmit = async () => {
        const ppData = {
            firstname: data.firstname,
            lastname: data.lastname,
            amount_donated: '' + donateAmount,
            currency: data.currency.toUpperCase(),
            email: data.email,
            phone: data.phone,
            isAnonymous: data.isAnonymous,
            city: data.city,
            address: data.address,
            state: data.state,
            country: data.country,
            payment_method: data.payment_method
        };
        console.log(ppData);
        const promise = axios(
            donate(
                id,
                ppData
            )
        )
        toast(promise)
        const resp = await promise
        if (resp?.data?.approval_url) {
            const token = resp.data.access_token;
            window.location.href = resp.data.approval_url
        }
    }

    return (
        <Box>
            <Button size="large" type="button" disabled={loading} variant="contained" sx={{ mb: 4 }} onClick={onSubmit}>
                Donate Now
            </Button>
        </Box>
    );
}