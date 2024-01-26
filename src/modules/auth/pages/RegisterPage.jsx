import React from 'react';
import RegisterContainer from "../containers/RegisterContainer";

const LoginPage = ({...rest}) => {
    return (
        <>
            <RegisterContainer {...rest} />
        </>
    );
};

export default LoginPage;
