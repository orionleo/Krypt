import React from 'react'
import Loader from "./components/Loader.jsx";
import Footer from "./components/Footer.jsx";
import Services from "./components/Services.jsx";
import Navbar from "./components/Navbar.jsx";
import Transactions from "./components/Transactions.jsx";
import Welcome from "./components/Welcome.jsx";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  )
}

export default App