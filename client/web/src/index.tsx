import "./index.css";

import ReactDOM from "react-dom/client";

import { App } from "./app";
import { AppProvider } from "./provider";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <AppProvider>
        <App />
    </AppProvider>
);
