import React, {useState,useEffect} from 'react'
import axios from "axios";
import {useHistory} from "react-router-dom";

const Userlist = ()=> {
    const [userlist, setUserlist] = useState('');
    const history=useHistory();

    useEffect(() => {
        axios.get(`http://localhost:3001/user/read/`)
            .then(res => {
                setUserlist(res.data.userlist);
            })
    }, []);

    const handleReadPost=(user)=>{
        history.push(`/@${user}`);
    }

    let listuser;
    if (userlist)
    {       listuser=userlist.map(user =>
        <tr key={user._id} onClick={()=>handleReadPost(user.userid)}>
            <td>{user.userid}</td>
            <td>{user.stockprice}</td>
            <td>{user.stocknum}</td>
        </tr>
    );
    }

    return (
        <React.Fragment>
            <h3>매매일지 List</h3>
            <table border="1">
                <thead>
                <tr>
                    <th> ID </th>
                    <th> 추천 수 </th>
                    <th> 댓글 수 </th>
                </tr>
                </thead>
                <tbody>
                {listuser}
                </tbody>
            </table>
        </React.Fragment>
    )

}
export default Userlist