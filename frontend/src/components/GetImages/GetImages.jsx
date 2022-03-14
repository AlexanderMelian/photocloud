import React from 'react';
import axios from 'axios';
import ImageCard from '../ImageCard/ImageCard';

const { SERVER_APP_IP, SERVER_APP_PORT } = require('../../util');
export default function GetImages() {
    const [images, setImages] = React.useState([]);
    React.useEffect(() => {
        axios.get(`http://${SERVER_APP_IP}:${SERVER_APP_PORT}/getimages`)
            .then(res => {
                setImages(res.data);
                console.log(res.data);
            })
        }
        , []);
        // rows of three images
        const rows = [];
        let row = [];
        for (let i = 0; i < images.length; i++) {
            row.push(<ImageCard image={images[i]} key={i} />);
            if (i % 3 === 2) {
                rows.push(<div className="row" key={i}>{row}</div>);
                row = [];
            }
        }


    return (
    
    <div>
        <p>Imagenes</p>
        <div>
            {images?.data?.map(image => {
                return <ImageCard image={image} />
                
            })}
        </div>


    </div>
    
    )


}