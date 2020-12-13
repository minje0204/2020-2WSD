import React,{useState} from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link,withRouter,useHistory } from 'react-router-dom';
import Button from '../common/Button';
import axios from 'axios';

const textMap = {
    login : '로그인',
    register : '회원가입'
};

const UserFormBlock = styled.div`
 h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }`;
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;
const ButtonWithMarginTop = styled(Button)`
    margin-top:1rem;
`;

const UserForm = ({type})=>{
    const [userid,setUserid]=useState('');
    const onChangeId=e=>setUserid(e.target.value);
    const [password,setPassword]=useState('');
    const onChangePw=e=>setPassword(e.target.value);
    const [confirmPassword, setConfirmPassword] = useState("")
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    const [cash,setCash]=useState('');
    const onChangeCash=e=>setCash(e.target.value);
    const history=useHistory();
    const text=textMap[type];


    var handleFormSubmit=()=>{};

    if(type==='login'){  //for login
    handleFormSubmit=(event)=> {
        event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다
        if(!password||!userid){
            return alert('아이디,비밀번호를 모두 입력해주세요')
        }
        axios({
            method: 'post',
            url: 'http://3.36.26.191:3001/user/login',
            data: {
                'userid': userid,
                'password': password
            }
        }).then(function (res) {
            if(res.data.success) {
                sessionStorage.setItem('isLogin', 'true');
                sessionStorage.setItem('userid', userid);
                alert(res.data.msg);
                if (sessionStorage.getItem('isLogin') === 'true') history.push('/');
            }
            else
                alert(res.data.msg);
        }).catch(err => alert(err))

    }


    }else {    //for register
        handleFormSubmit = (event) => {

            event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다

            if(password !== confirmPassword){
                return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
            }
            if(!password||!userid||!cash){
                return alert('공란이 있습니다')
            }
            axios({
                method:'post',
                url:'http://3.36.26.191:3001/user/register',
                data: {
                    'userid': userid,
                    'password': password,
                    'cash':cash
                }
            }).then(function(res){alert(res.data.msg);
            if(res.data.success)history.push('/login');}).catch(err=>alert(err))
        }
    }
    const handleIDSubmit = (event) => {   //id 중복 확인
        event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다

        axios({
            method:'post',
            url:'http://3.36.26.191:3001/user/checkid',
            data: {
                'userid': userid,
                'password': password
            }
        }).then(function(res){alert(res.data);}).catch(err=>alert(err))
    }
    return(
        <UserFormBlock>
            <h3>{text}</h3>
            <form onSubmit={handleFormSubmit}>
                <StyledInput
                    autoComplete="userid"
                    type='text'
                    name="userid"
                    placeholder="아이디"
                    value={userid}
                    onChange={onChangeId}
                />
                <StyledInput
                    autoComplete="new-password"
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                    value={password}
                    onChange={onChangePw}
                />
                {type==='register'&&(
                    <StyledInput
                        autoComplete="new-password"
                        name="passwordConfirm"
                        placeholder="비밀번호 확인"
                        type="password"
                        value={confirmPassword}
                        onChange={onConfirmPasswordHandler}
                    />
                )}
                {type==='register'&&(<StyledInput
                    name="cash"
                    placeholder="예수금 입력"
                    type="number"
                    value={cash}
                    onChange={onChangeCash}
                />)}
                <ButtonWithMarginTop cyan fullWidth>{text}</ButtonWithMarginTop>

            </form>
            <Footer>
                {type==='login'?(<Link to='/register'>회원가입</Link>):
                    (<Link to="/login">로그인</Link>)}
            </Footer>
        </UserFormBlock>
    );
};

export default withRouter(UserForm);