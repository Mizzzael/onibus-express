type TApiHooks<T, P> = {
    response?: T;
    loading: boolean;
    error?: Error;
    request: (params: P) => void;
}

export default TApiHooks;