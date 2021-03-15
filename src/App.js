import React from "react";
import Header from "./Components/Header";
import Feature from "./Components/Features";
import About from "./Components/About";
import Contact from "./Components/Contact";
import aboutImage from "./images/Phone.svg";;

function App() {
  return (
    <div className="App">
      <Header />
      <Feature />
      <About image={aboutImage} title="Mobile Responsive" />
      <Contact />
    </div>
  );
}

export default App;
