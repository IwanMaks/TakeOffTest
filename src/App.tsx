import * as React from 'react';
import {AuthPage} from "./pages/AuthPage/AuthPage";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import { ContactPage } from './pages/ContactPage/ContactPage';
import { PrivateRoutes } from './components/PrivateRoutes';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const App = (): JSX.Element => {
    return (
        <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<AuthPage/>} />
                        <Route path='/contacts' 
                            element={
                                <PrivateRoutes>
                                    <ContactPage/>
                                </PrivateRoutes>
                            } 
                        />
                    </Routes>
                </BrowserRouter>
                <ToastContainer />
        </Provider>
        
    )
}