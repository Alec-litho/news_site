import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from "react-bootstrap";
import NewsToolsComponent from '../components/NewsToolsComponent';
import CurrencyComponent from "../components/CurrencyComponent";
import NewsFeedComponent from '../components/NewsFeedComponent';
import TopicsToolComponent from '../components/TopicsToolComponent';
import ProfileComponent from '../components/ProfileComponent';
import {useAppSelector} from '../hooks/reduxCustomHooks'
//server components//
import HeadLinesComponent from '../components/server_components/HeadLinesComponent';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import getUserInfo from '../helperFunctions/fetchUserInfo';


export async function getServerSideProps() {
    // let currencies = await axios.get(`http://api.currencyapi.com/v3/latest?apikey=cur_live_nBRlzKBiDqzJCXAV40gWOfnC1BGU7FbRqJMhoIuE&currencies=EUR%2CUSD%2CCAD&base_currency=USD`)
    // let currenciesArr:Currencies[] = []
    // for (const currency in currencies.data.data) {
    //     currenciesArr.push(currencies.data.data[currency])
    // }
    // let curs = JSON.stringify(currenciesArr)
    // console.log(curs);
    
    // return {props: {currencies: curs}}
    return {props: {currencies: "currencies", userInfo:{}}}
}

export default function Home({currencies, userInfo}:InferGetStaticPropsType<typeof getServerSideProps>) {
    if(typeof window!=="undefined") {
        let userData = useAppSelector((state)=> state.auth)
        if(userData.logedIn === false) getUserInfo()
    }
    console.log(userInfo);
    
    return (
        <>
        <Container className="pt-5">
            <Row >
                <Col lg={2} className="leftContainer">
                    {/* <ProfileComponent fullName={userInfo.fullName} avatarUrl={userInfo.avatarUrl}/> */}
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
                <Col lg={7} >
                    <Container>
                        <NewsFeedComponent/>
                    </Container>
                </Col>
                <Col lg={3} className="rightContainer">
                    <Container>
                        <HeadLinesComponent/>
                    </Container>
                </Col>
            </Row>
        </Container>  
        </>
        
        )
}
