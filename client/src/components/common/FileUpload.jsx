import React, { useState, useEffect } from 'react';
import defaultImg from '../../images/upload.jpg';



const FileUpload = (props) => {
    let { fileSrc, setFileSrc, handelFileUpload } = props;


    // console.log(fileSrc)
    const [uploadFile, setUploadFile] = useState('');
    // const [fileName, setFileName] = useState('');

    const [filePreview, setFilePreview] = useState();


    useEffect(() => {
        setFilePreview(defaultImg);
    }, [])

    const handelUpload = (e) => {

    }

    const handelChange = (e) => {
        setUploadFile(e.target.files[0]);
        // setFileSrc(e.target.files[0].name);
        handelFileUpload(e.target.files[0], e.target.files[0].name);

        setFilePreview('');
        setFilePreview(URL.createObjectURL(e.target.files[0]));
        console.log(uploadFile)
        // console.log(fileName)
    }

    return (
        <div >
            <p>fileUpload</p>

            <div style={{ 'textAlign': 'center' }}>
                <div style={{ border: '1px solid' }}>

                    <img src={fileSrc ? fileSrc : filePreview} o alt="Girl in a jacket" width="300" height="300" style={{ border: '5px' }} />


                </div>

                <input type="file" id="" onChange={handelChange} style={{ marginTop: '5px' }} />

            </div>



        </div>
    )
}

export default FileUpload;