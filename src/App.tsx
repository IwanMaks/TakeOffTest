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

export const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<AuthPage/>} />
                    <Route path='/contacts' element={<ContactPage/>} />
                </Routes>
            </BrowserRouter>
        </Provider>
        
    )
}