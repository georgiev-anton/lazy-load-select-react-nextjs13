import {
    QueryClient,
    QueryFunction,
    useInfiniteQuery,
    UseInfiniteQueryOptions,
    UseInfiniteQueryResult
} from "@tanstack/react-query";
import axios from "axios";

export interface RequestUsers {
    page: number;
    limit: number;
}

export interface ResponseUsers {
    data: User[];
    meta: Meta;
    currentPage: number;
}

export interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    job: string
}

export interface Meta {
    from: number
    to: number
    total: number
}

const BASE_PATH = 'https://alanbase-front-bt2of.ondigitalocean.app'

export const getUsers = async (params: RequestUsers): Promise<ResponseUsers> => {
    const response = await axios<ResponseUsers>({
        url: `${BASE_PATH}/api/users`, method: 'get', params
    });

    return {...response.data, currentPage: params.page}
}

export const getGetUsersQueryKey = (params?: RequestUsers) => {
    return ['/api/users', ...(params ? [params] : [])];
}

export const getGetUsersInfiniteQueryOptions = (params: RequestUsers): UseInfiniteQueryOptions<Awaited<ReturnType<typeof getUsers>>> => {
    const queryKey = getGetUsersQueryKey(params);

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsers>>> = ({
                                                                              pageParam
                                                                          }) => getUsers({
        ...params,
        page: pageParam || params?.page,
    });

    return {
        queryKey,
        queryFn,
        getNextPageParam: (data) => {
            if (data?.meta?.from - (data?.currentPage + 1) < 0) {
                return undefined;
            }
            return data.currentPage + 1;
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false
    }
}

export const useGetUsersInfinite = (
    params: RequestUsers
): UseInfiniteQueryResult<ResponseUsers> => {
    const queryOptions = getGetUsersInfiniteQueryOptions(params)

    const query = useInfiniteQuery(queryOptions);

    return query;
}

export const prefetchGetUsersInfinite = async (
    queryClient: QueryClient,
    params: RequestUsers
): Promise<QueryClient> => {
    const queryOptions = getGetUsersInfiniteQueryOptions(params)

    await queryClient.prefetchInfiniteQuery(queryOptions);

    return queryClient;
}
