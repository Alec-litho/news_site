import { Provider } from 'react-redux';
import store from '../store/store'
import '../styles/Header.css';
import Header from '../components/Header';
import '../styles/login.css'
import '../styles/Home.css'
import '../styles/accountStyle.css'
import '../styles/Home.module.css'

export default function App({Component, pageProps}) {

    return (
            <Provider store={store}>
                <Header/>
                <Component {...pageProps}></Component>
            </Provider>
    )
} 