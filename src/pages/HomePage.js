import React,{Component} from 'react';
import Userlist from '../components/user/Userlist'
import background from "../images/background.jpg";

class HomePage extends Component {

    render() {
        return (
            <div >
                <img src={background} alt="background"/>
                <Userlist />
            </div>

        )
    }
}

export default HomePage