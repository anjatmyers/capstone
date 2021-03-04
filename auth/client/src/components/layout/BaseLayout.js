import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar"
import Footer from "./Footer";


const BaseLayout = (props) => {
  return (
    <>
      <Header />
      
      {props.children}

      <Sidebar />

      <br />
      <br />
    
    </>
  );
};

export default BaseLayout;
