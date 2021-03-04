import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ClippedDrawer from "./Sidebar"


const BaseLayout = (props) => {
  return (
    <>
      {/* <Header /> */}

      <ClippedDrawer />
      
      {props.children}
      <br />
      <br />
    
    </>
  );
};

export default BaseLayout;
