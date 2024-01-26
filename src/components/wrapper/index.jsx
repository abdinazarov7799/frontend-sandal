import React from 'react';
import styled from "styled-components";

const StyledWrapper = styled.div`

`;
const Wrapper = ({...rest}) => {
    return (
        <StyledWrapper  {...rest}/>
    );
};

export default Wrapper;