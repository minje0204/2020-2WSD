import React, {useState,useEffect} from 'react'
import axios from "axios";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Postlist = ({match})=> {
    const [profit, setProfit] = useState('');
    const [stocklist, setStocklist] = useState('');
    const {username} = match.params;

    useEffect(() => {
        axios.get(`http://localhost:3001/stock/read/@${username}`)
            .then(res => {
                setStocklist(res.data.stocklist);
                setProfit(res.data.profit);
            })
    }, []);
    let liststock;
    if (stocklist)
    {       liststock=stocklist.map(stock =>
        <tr key={stock._id}>
            <td>{stock.stockname}</td>
            <td>{stock.stockprice}</td>
            <td>{stock.stocknum}</td>
        </tr>
    );
    }
    const option={
        chart:{type:'spline'},
        title:{text:'수익금추이'},
        series:[{data:profit}]
    };

    return (
        <React.Fragment>
            <h3>자산 평가</h3>
            <table border="1">
                <thead>
                <tr>
                    <th> 주식 명 </th>
                    <th> 평균 단가 </th>
                    <th> 수량 </th>
                </tr>
                </thead>
                <tbody>
                {liststock}
                </tbody>
            </table>
            <h3>수익 그래프</h3>
            <HighchartsReact highcharts={Highcharts} options={option}/>
        </React.Fragment>
    )

}
export default Postlist