import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PersistentDrawerLeft from "./Sidebar"


const BaseLayout = (props) => {
  return (
    <>
      {/* <Header /> */}

      <PersistentDrawerLeft />
      
      {props.children}
      <br />
      <br />
    
    </>
  );
};

export default BaseLayout;
