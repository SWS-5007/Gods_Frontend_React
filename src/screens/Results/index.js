import * as React from 'react';
import { useParams } from 'react-router-dom';

export default function Result({ result }) {
    const { id } = useParams()

    React.useEffect(() => {
        setTimeout(() => { window.location.href='/donate' }, 2000);
    })
    return (
        <>
            <div> { result ? "success" : "cancelled"}</div>
        </>
    )
}
