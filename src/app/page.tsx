import React from "react";
import {prefetchGetUsersInfinite} from "@/api/users";
import {dehydrate, Hydrate, QueryClient} from "@tanstack/react-query";
import {UserSelector} from "@/app/components/UserSelector/UserSelector";

export default async function Hydation() {
    const queryClient = new QueryClient();

    await prefetchGetUsersInfinite(queryClient, {page: 1, limit: 50});

    const dehydratedState = dehydrate(queryClient);

    return (
        <Hydrate state={dehydratedState}>
            <UserSelector />
        </Hydrate>
    );
}
