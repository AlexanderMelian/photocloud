import React from 'react';
import { useState } from 'react';
import s from './Single.module.css';
import axios from 'axios';

const { SERVER_APP_IP, SERVER_APP_PORT } = require('../../util');
export default function SingleUpload() {

    const [input, setInput] = useState({
        file: []
    });

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.files[0]
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        let formData = new FormData();
        formData.append('image', input.file);
        axios.post(`http://${SERVER_APP_IP}:${SERVER_APP_PORT}/singleupload`, formData)
            .then(res => {
                console.log(res);
            }
            )
    }

    return (
        <div className={s.backDiv}>
            <p>Subir</p>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" onChange={handleChange} />
                <button type="submit">Subir</button>
            </form>
        </div>
    );

}