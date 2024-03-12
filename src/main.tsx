import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/global.scss";
import { store } from "@/store/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </>,
);
