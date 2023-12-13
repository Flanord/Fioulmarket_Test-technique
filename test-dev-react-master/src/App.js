import React from 'react';
import RegistrationForm from './Form/RegistrationForm';
import './App.css';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import TabComponent from "./components/TabComponent/TabComponent";

function App() {
  return (
    <div className="App">
      <TabComponent />
    </div>
  );
}

export default App;
