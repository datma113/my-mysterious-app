import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/global.scss";
import { store } from "@/store/store.ts";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>,
);
