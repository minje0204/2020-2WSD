import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import {useHistory} from "react-router-dom";

const NavigatorBlock = styled.ul`
  display : flex;
  flex-direction : row;
  width: 100%;
  height: 80px;
  margin : 0px;
  padding : 0px;
  background-color: black;
  list-style-type : none;
  background: ${palette.gray[3]};
`;

const NavigatorItem = styled.li`
  float : left;
  background-color: ${palette.gray[3]};
  color: #000000;
  padding: 8px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
`;
const NavigatorLink = styled.a`
  display: block;
background-color: ${palette.gray[3]};
color: #000000;
padding: 8px;
text-decoration: none;
text-align: center;
font-weight: bold;
`;

const Navigator = ({type})=>{
    const history=useHistory();
    const handleLogout=()=>{
        localStorage.removeItem('isLogin','false');
        history.push('/');
    }
    const posttab=()=>{
        history.push(`/@${localStorage.getItem('userid')}`);
    }
    return(
        <NavigatorBlock>
            <NavigatorItem>
                <NavigatorLink href="/"> Home </NavigatorLink>
            </NavigatorItem>

            <NavigatorItem>
                {localStorage.getItem('isLogin')==='true'?(<NavigatorLink onClick={handleLogout}> Logout </NavigatorLink>):(
                    <NavigatorLink href="/login"> Login </NavigatorLink>)}
            </NavigatorItem>
            <NavigatorItem>
                {localStorage.getItem('isLogin')==='true'?(<NavigatorLink onClick={posttab}> 매매일지 </NavigatorLink>):(
                    <NavigatorLink href="/register"> 회원가입 </NavigatorLink>)}
            </NavigatorItem>
        </NavigatorBlock>
    );
};
export default Navigator;