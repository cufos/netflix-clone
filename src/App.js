import React from "react";
import JumbotronContainer from "./containers/Jumbotron";
import FooterContainer from "./containers/footer";
import FaqsContainer from "./containers/faqs";

function App() {
  return (
    <>
      <JumbotronContainer />
      <FaqsContainer />
      <FooterContainer />
    </>
  );
}

export default App;
