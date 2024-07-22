import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from "react-bootstrap";
import NewsToolsComponent from '../components/NewsToolsComponent';
import CurrencyComponent from "../components/CurrencyComponent";
import NewsFeedComponent from '../components/NewsFeedComponent';
import TopicsToolComponent from '../components/TopicsToolComponent';
import ProfileComponent from '../components/ProfileComponent';
import {useAppDispatch, useAppSelector} from '../hooks/reduxCustomHooks'
//server components//
import HeadLinesComponent from '../components/server_components/HeadLinesComponent';
import { InferGetStaticPropsType, GetStaticProps, GetServerSideProps } from 'next';
import {wrapper} from '../store/store'
import axios from 'axios';
import parsedCookie from '../helperFunctions/parsedCookie';
import { getUser } from '../features/authSlice';

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {//allows using redux with next.js
    let parameters = parsedCookie(ctx.req.rawHeaders[11])
    store.dispatch(getUser({...parameters}))
    // let currencies = await axios.get(`http://api.currencyapi.com/v3/latest?apikey=cur_live_nBRlzKBiDqzJCXAV40gWOfnC1BGU7FbRqJMhoIuE&currencies=EUR%2CUSD%2CCAD&base_currency=USD`)
    // let currenciesArr:Currencies[] = []
    // for (const currency in currencies.data.data) {
    //     currenciesArr.push(currencies.data.data[currency])
    // }
    // let curs = JSON.stringify(currenciesArr)
    // console.log(curs);
    let {auth} = store.getState()
    console.log("auth   ",auth);
    
    return {props: {currencies: "currencies", userInfo:auth}}
})



export default function Home(props:any) {
    console.log(props.pageProps.userInfo);
    let userData = {...props.pageProps.userInfo}
    return (
        <>
        <Container className="pt-5">
            <Row >
                <Col xl={2} className="leftContainer">
                    <ProfileComponent fullName={userData.fullName} avatarUrl={userData.avatarUrl}/>
                    <div className="mt-3 bg-white px-3 py-1">
                        {/* {JSON.parse(currencies).map((currencyData:Currencies, id:number) => {
                            let val = currencyData.value.toString().slice(0,4)
                           return <div key={id} className="d-flex mb-2 align-items-center" style={{"gap":"20px"}}>
                                      <h4>{currencyData.code}</h4>
                                      <h5 style={{"color":"#4287f5"}}>{val}</h5>
                                </div>
                          })} */}
                    </div>
                    <NewsToolsComponent/>
                    <TopicsToolComponent/>
                </Col>
                <Col xl={7} md={9}>
                    <Container>
                        <NewsFeedComponent/>
                    </Container>
                </Col>
                <Col xl={3} md={3} className="rightContainer">
                    <Container>
                        <HeadLinesComponent/>
                    </Container>
                </Col>
            </Row>
        </Container>  
        </>
        
        )
}

