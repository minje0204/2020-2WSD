import React,{useState} from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import {Redirect} from 'react-router';

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 20%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const ButtonWithMarginTop = styled(Button)`
    margin-top:1rem;
`;

const PostForm = ()=>{
    const [userid,setUserid]=useState('');
    const onChangeId=e=>setUserid(e.target.value);

    const [password,setPassword]=useState('');
    const onChangePw=e=>setPassword(e.target.value);
    const [confirmPassword, setconfirmPassword] = useState("")
    const onconfirmPasswordHandler = (event) => {
        setconfirmPassword(event.currentTarget.value)
    }
    var handleFormSubmit=()=>{};
    if(type==='login'){
        handleFormSubmit=(event)=> {
            event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다

            fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'userid': userid,
                    'password': password
                })
            }).then(res=>{console.log(res.body);res.json()}
            ).then(res=>{console.log(res);if(res.result==='true'){alert('로그인 완료!')}else{alert('실패!')}})
        }
    }else {
        handleFormSubmit = (event) => {
            event.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레쉬 되는 것을 막는다

            if(password !== confirmPassword){
                return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
            }
            fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'userid': userid,
                    'password': password
                })
            }).then(res=>{console.log(res);res.json();}
            ).then(res=>{console.log(res);})
        }
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
                        onChange={onconfirmPasswordHandler}
                    />
                )}
                <ButtonWithMarginTop cyan fullWidth>{text}</ButtonWithMarginTop>

            </form>
            <Footer>
                {type==='login'?(<Link to='/register'>회원가입</Link>):
                    (<Link to="/login">로그인</Link>)}
            </Footer>
        </UserFormBlock>
    );
};
export default UserForm;