import { useMemo } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

const useToast = ({ config = {
    loading: "Loading...",
    error: "Something went wrong",
    success: "Success!"
}, options = {} } = {}) => {
    const { toasts } = useToasterStore();
    const loading = useMemo(() => {
        return toasts.find(t => t.id === options.id)?.visible
    }, [toasts, options])
    return {
        toast: (fn) => {
            toast.promise(fn, config, { ...(options || {}) })
        },
        loader: <Toaster />,
        loading,
    }
}

export default useToast