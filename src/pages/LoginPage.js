import React from 'react';
import UserTemplate from '../components/user/UserTemplate';
import UserForm from '../components/user/UserForm';
const LoginPage = () => {
    return (
        <UserTemplate>
            <UserForm type="login"/>
        </UserTemplate>
    );
};

export default LoginPage;