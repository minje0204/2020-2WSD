import React,{Component} from 'react';
import axios from 'axios';
import Button from '../components/common/Button';
import Postform from '../components/posts/Postform'

class PostListPage extends Component {

    render() {
        return (
            <div>
                <Postform/>
            </div>
        )
    }
}

export default PostListPage