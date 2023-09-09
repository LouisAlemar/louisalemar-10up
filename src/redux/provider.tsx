"use client";

import { Provider } from "react-redux";
import store from "./store";
import Nav from "@/components/nav/navigation";
import Footer from "@/components/footer/footer";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <Nav />
            {children}
            <Footer />
        </Provider>
    );
}
