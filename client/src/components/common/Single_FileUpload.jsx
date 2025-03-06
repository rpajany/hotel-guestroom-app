import React, { useState } from 'react';
import { singleFileUpload } from '../../services/api';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const FileUpload_Single = (props) => {
    const [singleFile, setSingleFile] = useState('');

    const [title, setTitle] = useState('');
    const [singleProgress, setSingleProgress] = useState(0);


    const SingleFileChange = (e) => {
        setSingleFile(e.target.files[0]);
        setSingleProgress(0);
    }

    const uploadSingleFile = async () => {
        const formData = new FormData();
        formData.append('file', singleFile);
        await singleFileUpload(formData, singleFileOptions);
        props.getsingle();
    }
    // singleFile options function ...
    const singleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setSingleProgress(percentage);
        }
    }


    return (
        <div>
            <div className='row'>
                <div className='col-4'>
                    <div className="form-group">
                        <label>Select Single File</label>
                        <input type="file" className="form-control" onChange={(e) => SingleFileChange(e)} />
                    </div>
                    <div className="row">
                        <div className="col-">
                            <button type="button" className="btn  btn-danger" onClick={() => uploadSingleFile()} >Upload</button>
                        </div>
                        <div className="col-2">
                            <CircularProgressbar
                                value={singleProgress}
                                text={`${singleProgress}%`}
                                styles={buildStyles({
                                    rotation: 0.25,
                                    strokeLinecap: 'butt',
                                    textSize: '16px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba(255, 136, 136, ${singleProgress / 100})`,
                                    textColor: '#f88',
                                    trailColor: '#d6d6d6',
                                    backgroundColor: '#3e98c7',
                                })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileUpload_Single;