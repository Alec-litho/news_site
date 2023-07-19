import { Provider } from 'react-redux';
import store from '../store/store'
import '../styles/Header.css';
import Header from '../components/Header';
import '../styles/login.css'
import { RouterGuard } from '../components/RouteGuard';
import '../styles/Home.css'
import '../styles/accountStyle.css'

export default function App({Component, pageProps}) {

    return (
            <Provider store={store}>
            <RouterGuard>
                <Header/>
                <Component {...pageProps}></Component>
            </RouterGuard>
            </Provider>
    )
} 