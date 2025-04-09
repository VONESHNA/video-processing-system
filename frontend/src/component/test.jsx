import React, { useEffect, useState } from 'react';

const VideoComponent = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [message, setMessage] = useState('');

    return (
        <div>
            <h1>{message}</h1>
            { (
                <video width="600" controls>
                    <source src={`http://127.0.0.1:8000/api/getvideo/45e157df-9cf4-47f6-8acf-91b9841ea02a_teacher.mp4`}  type="video/mp4"   />
                    <source src={`http://127.0.0.1:8000/api/getvideo/45e157df-9cf4-47f6-8acf-91b9841ea02a_teacher.mp4`}   type="video/mkv"  />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default VideoComponent;
