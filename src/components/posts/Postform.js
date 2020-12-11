import React, {Component, useState} from 'react'
import axios from "axios";
import {useHistory} from "react-router-dom";

const Postform = ()=>{
    const [buyname,setBuyname]=useState('');
    const onChangebuyname=e=>setBuyname(e.target.value);
    const [buynum,setBuynum]=useState('');
    const onChangebuynum=e=>setBuynum(e.target.value);
    const [buyprice,setBuyprice]=useState('');
    const onChangebuyprice=e=>setBuyprice(e.target.value);
    const [sellname,setSellname]=useState('');
    const onChangesellname=e=>setSellname(e.target.value);
    const [sellnum,setSellnum]=useState('');
    const onChangesellnum=e=>setSellnum(e.target.value);
    const [sellprice,setSellprice]=useState('');
    const onChangesellprice=e=>setSellprice(e.target.value);


    const history=useHistory();
    var handleSubmit=()=>{};
    handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:3001/stock/create',
            data: {
                'userid': localStorage.getItem('userid'),
                'sellname': sellname,
                'sellnum':parseInt(sellnum,10),
                'sellprice':parseInt(sellprice,10),
                'buyname': buyname,
                'buynum':parseInt(buynum,10),
                'buyprice':parseInt(buyprice,10),
            }
        }).then(function (res) {
            console.log(res.data);
            alert(`수익률 : ${res.data.profit}`);
        }).catch(err => alert(err))

    }

        return (
            <form onSubmit={handleSubmit} autoComplete="off">
                <input name="buyname" placeholder="매수 종목" onChange={onChangebuyname} value={buyname} /><br />
                <input name="buynum" placeholder="매수량" onChange={onChangebuynum} value={buynum} /><br />
                <input name="buyprice" placeholder="매수가격" onChange={onChangebuyprice} value={buyprice} /><br />
                <input name="sellname" placeholder="매도 종목" onChange={onChangesellname} value={sellname} /><br />
                <input name="sellnum" placeholder="매도량" onChange={onChangesellnum} value={sellnum} /><br />
                <input name="sellprice" placeholder="매도가격" onChange={onChangesellprice} value={sellprice} /><br />
                <button type="submit">Submit</button>
            </form>
        )

}

export default Postform