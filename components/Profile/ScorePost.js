import React from 'react';
import Post from '../Posts/Post';


export default function ScorePost({item}){
    if(!item){
      return;
    }    
    

    return (
        <Post item ={item}/>
    )
}