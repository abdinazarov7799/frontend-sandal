import React from 'react';
import {Spinner} from "@chakra-ui/react";
import styled from "styled-components";

const Styled = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InitialLoader = ({...rest}) => {
    return (
        <Styled {...rest}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </Styled>
    );
};

export default InitialLoader;