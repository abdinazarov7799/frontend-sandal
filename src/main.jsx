import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import {InitialLoader} from "./components/loader";
import Query from "./services/query";
import Theme from "./theme";
import Router from "./router";
import Auth from "./services/auth/Auth";
import i18n from './services/i18n/index.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
    <Suspense fallback={<InitialLoader/>}>
        <Query>
            <Theme>
                <Auth>
                    <Router/>
                </Auth>
            </Theme>
        </Query>
    </Suspense>
);
