import React from "react";
import ReactDom from "react-dom/client";
import 'antd/dist/antd.css';
import './index.scss'
import {BrowserRouter} from "react-router-dom";
import Routes from "@/router";

import {Provider} from "react-redux";
import store from '@/store';


const container = document.getElementById("root");
const root = ReactDom.createRoot(container);
root.render(
    // <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </Provider>
    // </React.StrictMode>
)
;
