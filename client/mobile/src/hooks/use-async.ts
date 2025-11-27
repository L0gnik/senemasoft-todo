import { useCallback, useState } from "react";

export const useAsync = <TData, Args extends unknown[] = []>(
    asyncFunction: (...args: Args) => Promise<TData>,
    onSuccess?: (data: TData) => void,
    onError?: (error: Error) => void
): {
    data: TData | null;
    isLoading: boolean;
    error: Error | null;
    execute: (...args: Args) => Promise<void>;
} => {
    const [data, setData] = useState<TData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const execute = useCallback(
        async (...args: Args) => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await asyncFunction(...args);
                setData(response);
                if (onSuccess) {
                    onSuccess(response);
                }
            } catch (err) {
                const errorObject =
                    err instanceof Error ? err : new Error(String(err));
                setError(errorObject);
                if (onError) {
                    onError(errorObject);
                }
            } finally {
                setIsLoading(false);
            }
        },
        [asyncFunction, onSuccess, onError]
    );

    return { data, isLoading, error, execute };
};

export default useAsync;
