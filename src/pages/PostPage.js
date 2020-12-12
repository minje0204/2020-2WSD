import React,{Component} from 'react';
import axios from 'axios';
import Button from '../components/common/Button';
import Postsummary from '../components/posts/Postsummary'

const PostListPage=({match})=> {
    const {username}=match.params

        return (
            <div>
                <Postsummary username={username}/>
            </div>
        )

}

export default PostListPage