import React, { useState } from 'react'
import axios from 'axios';

export default function Test() {
    const [src, setSrc] = useState('');
    const imageName = '2018041991.jpg'
    const url = `http://localhost:8080/uploads/${imageName}`
    axios.get(url, { responseType: 'blob' })
        .then(res => {
            var imageUrl = URL.createObjectURL(res.data);
            setSrc(imageUrl);
            return (
                <img src={src} alt="trial" />
            )
        })
    return (
        <div>text</div>
    )
}

export async function get_ImageUpload() {
    const imageName = '2018041991.jpg'
    const url = `http://localhost:8080/uploads/${imageName}`
    try {
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                'Content-Type': 'image/jpeg'
            }
        })
        const blob = await response.blob()
        return [URL.createObjectURL(blob), null];
    }
    catch (error) {
        console.error(`get: error occurred ${error}`);
        return [null, error]
    }
}   