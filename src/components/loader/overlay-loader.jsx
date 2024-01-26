import React from 'react';
import styled from "styled-components";
import {Spinner} from "@chakra-ui/react";

const Styled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  background-color: rgba(255,255,255,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const OverlayLoader = ({...rest}) => {
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

export default OverlayLoader;