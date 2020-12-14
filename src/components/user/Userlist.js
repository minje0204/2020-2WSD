import React, {useState,useEffect} from 'react'
import axios from "axios";
import {useHistory} from "react-router-dom";
import Button from '../common/Button';

const Userlist = ()=> {
    const [userlist, setUserlist] = useState('');

    const history=useHistory();

    useEffect(() => {
        axios.get(`http://3.35.218.80:3001/user/read/`)
            .then(res => {
                setUserlist(res.data.userlist);
            })
    }, []);

    const handleReadPost=(user)=>{
        history.push(`/@${user}`);
    }

    let listuser;
    let profit;
    if (userlist)
    {       listuser=userlist.map(user =>{
        profit=user.profit.reduce((sum,current)=>sum+current,0)/user.profit.length;
        return(
        <li key={user._id} >
            <div>유저이름 : {user.userid}</div>
            <div>수익률 : {profit.toFixed(3)}%</div>
            <Button onClick={()=>handleReadPost(user.userid)}>수익률 및 종목 보러가기</Button>
        </li>)}
    );
    }

    return (
        <React.Fragment>
            <h1>List</h1>
                <ul className={"userlist"}>
                    {listuser}
                </ul>
        </React.Fragment>
    )

}
export default Userlist