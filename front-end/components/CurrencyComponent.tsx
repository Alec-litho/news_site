import axios from "axios"
import { GetServerSideProps } from "next"
type CurrenciesResponse = {
    data: {meta:object, data:object}
}



export default function CurrencyComponent(props) {
    console.log(props);
    
    return (
        <div className="mt-3 bg-white px-3 py-1">
            {/* {currencies.map((currencyData, id) => {
                console.log(currencyData.key.code) 
                return <div key={id} className="d-flex mb-2 align-items-center" style={{"gap":"20px"}}>
                    <h4>{currencyData.key.code}</h4>
                    <h6 style={{"color":"#4a4a4a"}}>{currencyData.key.value}</h6>
                </div>
            })} */}
        </div>
    )
}