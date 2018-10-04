import React, { Component } from "react";
import { Provider } from "./context";
import Contacts from "./components/contacts/Contacts";
import Header from "./components/layout/Header";
import About from "./components/pages/About";
import NotFoundPage from "./components/pages/NotFoundPage";
import AddContact from "./components/contacts/AddContact";
import EditContact from "./components/contacts/EditContact";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/add" component={AddContact} />
                <Route exact path="/edit/:id" component={EditContact} />
                <Route exact path="/about" component={About} />
                <Route component={NotFoundPage} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
