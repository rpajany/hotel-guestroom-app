import React, { useEffect, useState } from "react";
const imageUrl = "http://localhost:8080/uploads/2018041991.jpg";

export default function TestX() {
    const [img, setImg] = useState();

    const fetchImage = async () => {
        const res = await fetch(imageUrl);
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImg(imageObjectURL);
    };

    useEffect(() => {
        fetchImage();
    }, []);

    return (
        <>
            <img src={img} alt="icons" />
        </>
    );
}