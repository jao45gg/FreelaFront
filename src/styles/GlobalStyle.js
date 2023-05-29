import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 * {
   box-sizing: border-box;
 }
 a {
   font-family: 'Roboto', sans-serif;
   font-weight: 700;
   font-size: 2dvh;
   line-height: 18px;
   color: white;
   text-decoration: none;
   }
 form {
   font-family: 'Roboto', sans-serif;
   width: 70dvw;
   height: 70dvh;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 2dvh;
   border-radius: 5px;
 }
 input {
   font-family: 'Roboto', sans-serif;
   font-size: 2dvh;
   width: 100%;
   height: 7dvh;
   border-radius: 5px;
   outline: none;
   border: 1px solid #ccc;
   padding: 15px;
   margin: 1px;
   :focus {
      border: 2px solid #ffb6b6;
      margin: 0px;
   }
 }
 button {
   font-family: 'Roboto', sans-serif;
   display: flex;
   align-items: center;
   justify-content: center;
   outline: none;
   border: none;
   border-radius: 5px;
   background-color: red;
   font-size: 2dvh;
   font-weight: 600;
   color: #fff;
   cursor: pointer;
   width: 100%;
   height: 7dvh;
   padding: 12px;
 }

`;

export default GlobalStyle;