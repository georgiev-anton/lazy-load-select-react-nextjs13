"use client";

import React from "react";
import {QueryClientProvider, QueryClient, Hydrate} from "@tanstack/react-query";

function Providers({ children }: React.PropsWithChildren) {
    const [client] = React.useState(new QueryClient());

    return (
        <QueryClientProvider client={client}>
            <Hydrate>{children}</Hydrate>
        </QueryClientProvider>
    );
}

export default Providers;
