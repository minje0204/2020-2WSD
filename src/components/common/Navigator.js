import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';


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
    return(
        <NavigatorBlock>
            <NavigatorItem>
                <NavigatorLink href="/"> Home </NavigatorLink>
            </NavigatorItem>

            <NavigatorItem>
                {type==='login'?(<NavigatorLink href="/logout"> Logout </NavigatorLink>):(
                    <NavigatorLink href="/login"> Login </NavigatorLink>)}
            </NavigatorItem>
            <NavigatorItem>
                {type==='login'?(<NavigatorLink href="/WritePostPage"> 일지 작성</NavigatorLink>):(
                    <NavigatorLink href="/register"> 회원가입 </NavigatorLink>)}
            </NavigatorItem>
        </NavigatorBlock>
    );
};
export default Navigator;