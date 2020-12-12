import React,{Component} from 'react';
import axios from 'axios';
import Button from '../components/common/Button';
import Userlist from '../components/user/Userlist'

class HomePage extends Component {

    render() {
        return (
            <div>
                <Userlist />
            </div>
        )
    }
}

export default HomePage