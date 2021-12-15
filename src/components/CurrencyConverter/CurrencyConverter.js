import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addWindow} from "../../actions/windowsActions";
import './CurrencyConverter.scss';


const CurrencyConverter = (props) => {

    const [data, setData] = useState(null);
    const [targetCurrencies, setTargetCurrencies] = useState(['USD','EUR']);
    const [isLoading, setIsLoading] = useState(true);
    const [amount , setAmount ] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => fetchData(), []);

    const fetchData = async () => {
        const date = new Date();
        const requestDate = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;

        await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${requestDate}&json`)
            .then(res => res.json())
            .then(res => {
                setData(res.filter(item => targetCurrencies.some(currencyItem => currencyItem === item.cc)));
                setIsLoading(false);
            });
    }

    if(isLoading){
        return 'loading';
    }

    const handleEmptyValue = (e) => {
        if (!e.currentTarget.value.length || +e.currentTarget.value === 0){
            setAmount(1)
        }
    }

    return(
        <div className={`currencyConverter ${props.className || ""}`}>
            <div className="currencyConverter__currencies">
                {data.map(item => (

                    <div key={item.r030} className="currencyConverter__currencies-item">
                        <span className="currencyConverter__currencies-val">{(amount / item.rate).toFixed(2)}</span>
                        <span className="currencyConverter__currencies-cc">{item.cc}</span>
                    </div>
                ))}
            </div>

            <div className="currencyConverter__base">
                <input
                    className="currencyConverter__base-input"
                    type="number"
                    min="0"
                    value={amount}
                    onBlur={handleEmptyValue}
                    onChange={e => setAmount(e.currentTarget.value || '')}/>
                <span className="currencyConverter__base-cc">UAH</span>
            </div>

            <button className="currencyConverter__settings" onClick={() => dispatch(addWindow(5, 'Настройка курсов валют'))}>
                <i className="icon icon--md icon--setting"></i>
            </button>
        </div>
    )
}

export default CurrencyConverter;