import React, { useState } from 'react';

function Detection() {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false); // New state for upload success
    const [showForm, setShowForm] = useState(true); // New state to control form visibility

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        setIsLoading(true); // Set loading state to true
        setResponseMessage(''); // Clear previous response message
        setUploadSuccess(false); // Reset upload success state

        if (!file) {
            alert("Please select a file first!");
            setIsLoading(false); // Reset loading state
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/uploadvideo', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('detection completed successfully:', data);
                setResponseMessage(data.message); // Assuming the response has a message field
                setUploadSuccess(true); // Set upload success to true
                setShowForm(false); // Hide the form after successful upload
            } else {
                console.error('File upload failed:', response.statusText);
                setResponseMessage('File upload failed: ' + response.statusText);
                setUploadSuccess(false); // Set upload success to false
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setResponseMessage('Error uploading file: ' + error.message);
            setUploadSuccess(false); // Set upload success to false
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        <>
            {isLoading ? (
                <div className="bg-green-50">
                    <p className='text-red-700 pl-50'>Detection in Progress...</p>
                </div>
            ) : (
                <>
                    {showForm && ( // Render the form only if showForm is true
                        <div>
                            <div>
                                <input
                                    className='bg-amber-600 h-10 rounded-2xl ml-60'
                                    type="file"
                                    onChange={handleFileChange}
                                    name="videofile"
                                />
                            </div>
                            <div>
                                <br />
                                <button className='ml-60' onClick={handleUpload}>Upload</button>
                            </div>
                        </div>
                    )}
                    {uploadSuccess && responseMessage && ( // Render response message only if upload was successful
                        <div className="bg-green-50">
                            <h2 className='text-red-700'>{responseMessage}</h2> {/* Display response message */}
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default Detection;
