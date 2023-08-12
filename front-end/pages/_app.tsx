import { Provider } from 'react-redux';
import store from '../store/store'
import Header from '../components/Header';
import '../styles/login.css'
import '../styles/Home.css'
import '../styles/accountStyle.css'
import '../styles/Home.module.css'
import '../styles/Header.css'
import '../styles/globals.css'
import '../styles/register.css'
import Head from 'next/head';
import Script from 'next/script'

export default function App({Component, pageProps}) {

    return (
        <Provider store={store}>
                <Header/>
                <Component {...pageProps}></Component>
            </Provider>
    )
} 