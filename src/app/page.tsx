import React from "react";
import {prefetchGetUsersInfinite, USERS_BASE_LIMIT} from "@/api/users";
import {dehydrate, Hydrate, QueryClient} from "@tanstack/react-query";
import {UserSelector} from "@/app/components/UserSelector";
import S from "@/styles/page.module.scss";

export default async function Hydation() {
    const queryClient = new QueryClient();

    await prefetchGetUsersInfinite(queryClient, {page: 1, limit: USERS_BASE_LIMIT});

    const dehydratedState = dehydrate(queryClient);

    return (
        <Hydrate state={dehydratedState}>
            <main className={S.MainContainer}>
                <UserSelector/>
            </main>
        </Hydrate>
    );
}
