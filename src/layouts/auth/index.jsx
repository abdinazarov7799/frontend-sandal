import React from 'react';
import {Outlet} from "react-router-dom";
import styled from "styled-components";
import {
    Flex,
    Stack,
} from '@chakra-ui/react';

const Styled = styled.div`
 

  .box {
    padding: 40px 50px;
    background: #FFFFFF;
    box-shadow: 1px 6px 36px -2px rgba(0, 0, 0, 0.07);
    border-radius: 10px;
  }
  .logo{
    width: 250px;
    text-align: center;
    display: inline-block;
  }
`;
const AuthLayout = ({
                        ...rest
                    }) => {
    return (
        <Styled>
            <Stack minH={'100vh'} direction={{base: 'column', md: 'row'}}>
                <Flex p={8} flex={1} align={'center'} justify={'center'} className={'bg'}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <div className="box">
                            <Outlet/>
                        </div>
                    </Stack>
                </Flex>
            </Stack>
        </Styled>
    );
};

export default AuthLayout;