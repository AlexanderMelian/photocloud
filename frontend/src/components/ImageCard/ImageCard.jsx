import React from 'react';
import s from './Image.module.css';

export default function ImageCard(props) {

    return (
        <div className={s.Images}>
            
            <img src={'data:image/jpeg;base64,' + props.image} alt="image"  width="35%"/>
        </div>
    )
}
