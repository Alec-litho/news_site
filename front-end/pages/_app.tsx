import { Provider } from 'react-redux';
import {wrapper} from '../store/store'
import Header from '../components/Header';
import '../styles/login.css'
import '../styles/Home.css'
import '../styles/accountStyle.css'
import '../styles/Home.module.css'
import '../styles/Header.css'
import '../styles/globals.css'
import '../styles/register.css'
import  '../styles/components/ProfileComp-style.css'
import '../styles/components/NewsToolsComp-style.css'

function App({Component, ...pageProps}) {
    const { store, props } = wrapper.useWrappedStore(pageProps);
    return (
        <Provider store={store}>
                <Header/>
                <Component {...pageProps}></Component>
            </Provider>
    )
} 

export default App