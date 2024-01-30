import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { extendTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import Wrapper from "../components/wrapper";
import { ToastContainer } from "react-toastify";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";

const theme = extendTheme({
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
});

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6, p, ul {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  .title-color{
    color: #fff;
  }
  
  body {
    color: #707070;
    font-size: 16px;
    line-height: 1.45;
    font-weight: 400;
    font-family: 'Montserrat', sans-serif;
  }
  
  .active > .chakra-link > div{
    background-color: #63B4EC !important;
    color: #fff;
  }

  #nprogress .bar {
    background: #63B4EC !important;
    height: 4px !important;
    z-index: 99999 !important;
  }

  .horizontal-scroll {
    overflow-x: auto;
    white-space: nowrap;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #F5F5F5;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #63B4EC;
    border-radius: 6px;
  }
  ::-moz-selection {
    background: #b3d4fc;
    text-shadow: none;
  }

  ::selection {
    background: #b3d4fc;
    text-shadow: none;
  }
  

`
const Theme = ({ children }) => {

  return (
    <ThemeProvider theme={{}}>
      <ChakraProvider theme={theme}>
        <GlobalStyles />
        <ToastContainer />
        <Wrapper>{children}</Wrapper>
      </ChakraProvider>
    </ThemeProvider>
  );
};

export default Theme;
