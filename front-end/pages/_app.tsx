import { Provider } from 'react-redux';
import store from '../store/store'
import Header from '../components/Header';

export default function App({Component, pageProps}) {
    console.log(pageProps);
    
    return (
        <Provider store={store}>
            <Header/>
            <Component {...pageProps}></Component>
        </Provider>
    )
} 