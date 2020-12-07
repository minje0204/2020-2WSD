import React from 'react';
import UserTemplate from '../components/user/UserTemplate';
import UserForm from '../components/user/UserForm';

const RegisterPage = () => {
    return (
        <UserTemplate>
            <UserForm type="register"/>
        </UserTemplate>
    );
};

export default RegisterPage;