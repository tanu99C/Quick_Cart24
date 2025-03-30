import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import {HashRouter} from "react-router-dom";
import './bootstrap-overrides.css';
import {ShoppingItemsProvider} from "./context/ShoppingItemsContext.jsx";
import {ShoppingCartProvider} from "./context/ShoppingCartContext.jsx";
import {NavBarProvider} from "./context/NavBarContext.jsx";
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HashRouter>
            <ShoppingItemsProvider>
                <ShoppingCartProvider>
                    <NavBarProvider>
                        <App/>
                    </NavBarProvider>
                </ShoppingCartProvider>
            </ShoppingItemsProvider>
        </HashRouter>
    </StrictMode>,
)