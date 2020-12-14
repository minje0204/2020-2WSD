import React, {useState} from 'react'
import axios from "axios";


const Postform = ()=> {
    const [buyname, setBuyname] = useState('');
    const onChangebuyname = e => setBuyname(e.target.value);
    const [buynum, setBuynum] = useState('');
    const onChangebuynum = e => setBuynum(e.target.value);
    const [buyprice, setBuyprice] = useState('');
    const onChangebuyprice = e => setBuyprice(e.target.value);
    const [sellname, setSellname] = useState('');
    const onChangesellname = e => setSellname(e.target.value);
    const [sellnum, setSellnum] = useState('');
    const onChangesellnum = e => setSellnum(e.target.value);
    const [sellprice, setSellprice] = useState('');
    const onChangesellprice = e => setSellprice(e.target.value);
    const [cash, setCash] = useState('');
    const onChangeCash = e => setCash(e.target.value);

    var handleSubmit = () => {
    };
    handleSubmit = (e) => {
        e.preventDefault()
        //if(!cash) setCash(0);
        axios({
            method: 'post',
            url: 'http://3.35.218.80:3001/stock/create',
            data: {
                'userid': sessionStorage.getItem('userid'),
                'sellname': sellname,
                'sellnum': parseInt(sellnum, 10),
                'sellprice': parseInt(sellprice, 10),
                'buyname': buyname,
                'buynum': parseInt(buynum, 10),
                'buyprice': parseInt(buyprice, 10),
                'cash':parseInt(cash,10),
                /*'year':date.getFullYear(),
                'month':date.getMonth(),
                'day':date.getDate(),*/
            }
        }).then(function (res) {
            console.log(res.data);
            alert(`${res.data.msg} 통장잔고:${res.data.cash}`);

        }).catch(err => alert(err))

    }


    return (
            <React.Fragment>
                <h3>일지 작성 Tab</h3>
            <form onSubmit={handleSubmit} autoComplete="off">
                <input name="buyname" placeholder="매수 종목" onChange={onChangebuyname} value={buyname} /><br />
                <input name="buynum" placeholder="매수량" onChange={onChangebuynum} value={buynum} /><br />
                <input name="buyprice" placeholder="매수가격" onChange={onChangebuyprice} value={buyprice} /><br />
                <input name="sellname" placeholder="매도 종목" onChange={onChangesellname} value={sellname} /><br />
                <input name="sellnum" placeholder="매도량" onChange={onChangesellnum} value={sellnum} /><br />
                <input name="sellprice" placeholder="매도가격" onChange={onChangesellprice} value={sellprice} /><br />
                <input name="cash" placeholder="예수금 변동사항"  onChange={onChangeCash} value={cash} /><br />

                <button type="submit">Submit</button>
            </form>
            </React.Fragment>
        )

}

export default Postform