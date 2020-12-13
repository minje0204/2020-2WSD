import React, {useState,useEffect} from 'react'
import axios from "axios";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Postsummary = (username)=> {
    const [profit, setProfit] = useState('');
    const [stocklist, setStocklist] = useState('');
    const [commentlist, setCommentlist] = useState('');

    const handlecomment=(event) => {

        event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다
        if(!event.target.comment.value){
            return alert('댓글 공란');
        }
        const date=new Date();
        console.log(sessionStorage.getItem('userid'));
        axios({
            method:'post',
            url:`http://3.35.218.80:3001/posts/comment/@${username.username}`,
            data: {
                'writer': sessionStorage.getItem('userid'),
                'comment': event.target.comment.value,
                'year': date.getFullYear(),
                'month': date.getMonth(),
                'date': date.getDate()
            }
        }).then(function(res){alert(res.data.msg);updatecomment();}).catch(err=>alert(err))
    }



    useEffect(() => {

        axios.get(`http://3.35.218.80:3001/stock/read/@${username.username}`)
            .then(res => {
                setStocklist(res.data.stocklist);
                setProfit(res.data.profit);
            })
        axios.get(`http://3.35.218.80:3001/posts/comment/read/@${username.username}`)
            .then(res => {
                setCommentlist(res.data.commentlist);
                console.log(res.data.commentlist);
            })

    }, []);
    const updatecomment=(() => {
        axios.get(`http://3.35.218.80:3001/posts/comment/read/@${username.username}`)
            .then(res => {
                setCommentlist(res.data.commentlist);
                console.log(res.data.commentlist);
            })
    });
    let liststock;
    if (stocklist)
    {       liststock=stocklist.map(stock =>
        <tr >
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

    let listcomment;
    if (commentlist)
    {       listcomment=commentlist.map(comment =>
        <div id={comment._id}>
            <div className="comment-info">작성자:{comment.writer}   날짜:{comment.date}</div>
            <div className="comment-content">
                {comment.comment}
            </div>
        </div>

    );
    }

    return (
        <React.Fragment>

            <table class="pop_table">
                <caption>자산 평가</caption>
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
            <div class={"profitgraph"}>
            {(profit==0)?(<div>아직수익이 실현되지 않았습니다.</div>):(<HighchartsReact highcharts={Highcharts} containerProps={{className:"chart"}} options={option}/>)}
            </div>
            <hr/>
            <form onSubmit={handlecomment}>
                <textarea name="comment" rows="5"></textarea><br/>
                <button type="submit">댓글 달기</button>
            </form>
            {listcomment}

        </React.Fragment>
    )

}
export default Postsummary

