import React from 'react';
import './App.css';
import Navigator from "./components/common/Navigator";
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostListPage from './pages/PostListPage';

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <header>
            <Navigator />
          </header>
          <Route component={LoginPage} path="/login" />
          <Route component={RegisterPage} path="/register" />
          <Route component={PostListPage} path={["/@:username","/"]} exact/>
        </div>
    );
    ;
  }
}
export default App;
