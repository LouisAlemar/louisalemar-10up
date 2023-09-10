"use client";

import { Provider } from "react-redux";
import store from "./store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <Header />
            {children}
            <Footer />
        </Provider>
    );
}
