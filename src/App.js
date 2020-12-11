import React from 'react';
import './App.css';
import Navigator from "./components/common/Navigator";
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PostListPage from './pages/PostListPage';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            islogin: false,
        }
    }
    /*callAPI() {
        axios.get("http://localhost:3000/posts")
            .then(res => {
                console.log(res.data);
                this.setState({ notices: res.data.notices });
            })
    }
    componentDidMount() {
        this.callAPI();
    }*/
    render() {
    return (
        <div className="App">
          <header>
                  <Navigator/>
          </header>
          <Route component={LoginPage} path="/login" />
          <Route component={RegisterPage} path="/register" />
          <Route component={PostListPage} path={["/@:username"]} exact/>
        </div>
    );
  }
}
export default App;
