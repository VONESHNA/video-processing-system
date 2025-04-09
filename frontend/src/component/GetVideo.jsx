import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GetVideo = () => {
  const [videodata, setvideodata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { video } = useParams();
  
  useEffect(() => {
    const fetchvideodata = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getvideodetail/${video}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonvideodata = await response.json();
        setvideodata(jsonvideodata[0]); // Access the first element of the array
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchvideodata();
  }, [video]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Assuming the API returns an object with properties: _id, video_filename
  return (
    <div>



      { (<div className='pl-70 pr-70 rounded-2xl'> 
                <video   className="w-120 h-20 rounded-lg shadow-lg" controls>
                    <source src={`http://127.0.0.1:8000/api/getvideo/${videodata.video_filename}`}  type="video/mp4"   />
                    <source src={`http://127.0.0.1:8000/api/getvideo/${videodata.video_filename}`}   type="video/mkv"  />
                    Your browser does not support the video tag.
                </video>
                </div>
            )}
    </div>
  );
};

export default GetVideo;
