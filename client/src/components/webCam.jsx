import React, { useState } from 'react'
import Webcam from "react-webcam";

const WebCam = (props) => {
    let {  setImageSrc } = props;

  

    const [image, setImage] = useState('');



    const webcamRef = React.useRef(null);

    const videoConstraints = {
        // deviceId: devices[0],
        width: 320, // 220
        height: 300, // 200
        facingMode: "user"
    };

    const capture = React.useCallback(
        () => {


            let imageSrc2 = webcamRef.current.getScreenshot();
            setImage(imageSrc2)
            // inputData.photo = imageSrc;

            setImageSrc(imageSrc2)
            // console.log(imageSrc)

        }

    );


    return (
        <div>
            <p>WebCam</p>



            <div className="webcam-img">

                {image === '' ? <Webcam
                    audio={false}
                    height={300} // 200
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={320} // 220
                    videoConstraints={videoConstraints}
                    style={{ border: '1px solid #ccc' }}
                /> : <img src={image} alt='' style={{ border: '1px solid #ccc' }} />}
            </div>
            <div className='' style={{ 'textAlign': 'center' }}>
                {image !== '' ?



                    <button onClick={(e) => {
                        e.preventDefault();
                        setImage('')

                    }}
                        className="webcam-btn">
                        Retake Image</button> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();
                        // validate2();
                    }}
                        className="webcam-btn">Capture</button>

                }

            </div>



        </div>
    )
}

export default WebCam