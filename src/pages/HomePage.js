import React,{Component} from 'react';
import axios from 'axios';
import Button from '../components/common/Button';
import Userlist from '../components/user/Userlist'
import background from "../images/background.jpg";

class HomePage extends Component {

    render() {
        return (
            <div >
                <img src={background}/>
                <Userlist />
            </div>

        )
    }
}

export default HomePage