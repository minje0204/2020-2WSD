import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import {useHistory} from "react-router-dom";

const NavigatorBlock = styled.ul`
  display : flex;
  flex-direction : row;
  width: 100%;
  margin : 0px;
  margin-bottom: 50px;
  padding : 0px;
  background-color: black;
  list-style-type : none;
  background: ${palette.gray[8]};
`;

const NavigatorItem = styled.li`
  float : left;
  background-color: ${palette.gray[8]};
  color: #000000;
  padding: 8px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
`;
const NavigatorLink = styled.a`
  display: block;
background-color: ${palette.gray[8]};
color: white;
padding: 8px;
text-decoration: none;
text-align: center;
font-weight: bold;
`;

const Navigator = ({type})=>{
    const history=useHistory();
    const handleLogout=()=>{
        sessionStorage.removeItem('isLogin','false');
        history.push('/login');
    }
    const writetab=()=>{
        history.push(`/write/@${sessionStorage.getItem('userid')}`);
    }
    const posttab=()=>{
        history.push(`/@${sessionStorage.getItem('userid')}`);
    }
    return(
        <NavigatorBlock>
            <NavigatorItem>
                <NavigatorLink href="/"> Home </NavigatorLink>
            </NavigatorItem>

            <NavigatorItem>
                {sessionStorage.getItem('isLogin')==='true'?(<NavigatorLink onClick={handleLogout}> Logout </NavigatorLink>):(
                    <NavigatorLink href="/login"> Login </NavigatorLink>)}
            </NavigatorItem>
            <NavigatorItem>
                {sessionStorage.getItem('isLogin')==='true'?(<NavigatorLink onClick={writetab}>매매일지 작성</NavigatorLink>
                    ):(
                    <NavigatorLink href="/register"> 회원가입 </NavigatorLink>)}
            </NavigatorItem>
            <NavigatorItem>
                {sessionStorage.getItem('isLogin')==='true'?(<NavigatorLink onClick={posttab}>자산 평가</NavigatorLink>
                ):(<div></div>)}
            </NavigatorItem>


        </NavigatorBlock>
    );
};
export default Navigator;