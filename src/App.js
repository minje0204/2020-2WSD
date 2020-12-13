import React from 'react';
import './App.css';
import Navigator from "./components/common/Navigator";
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PostWritePage from './pages/PostWritePage';
import PostPage from './pages/PostPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            islogin: false,
        }
    }
    render() {
    return (
        <div className="App">
          <header>
                  <Navigator/>
          </header>

            <Route component={HomePage} exact path="/" />
          <Route component={LoginPage} path="/login" />
          <Route component={RegisterPage} path="/register" />
          <Route component={PostWritePage} path="/write/@:username" />
          <Route component={PostPage} path={["/@:username"]} />

            </div>
    );
  }
}
export default App;
