import { RequireAuth } from 'react-auth-kit'

export default function Protected() {
    return (
        <RequireAuth loginPath={'/login'}>
            <div>
                Sample of Protected Page
            </div>
        </RequireAuth>
    );
}
