"use client";

import { Provider } from "react-redux";
import store from "./store";
import Nav from "@/components/Nav/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <Nav />
            {children}
        </Provider>
    );
}
