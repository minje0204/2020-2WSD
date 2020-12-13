import React from 'react';
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