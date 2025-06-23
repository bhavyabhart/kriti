import React, { useState } from 'react';
import './FormPage.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FormPage = () => {
  const [formData, setFormData] = useState({
    websiteType: '',
    businessName: '',
    additionalInfo: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/design', { state: { ...formData, uploadedFiles } });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedFiles((prevFiles) => [...prevFiles, ...files]);

      setFormData((prevData) => ({
        ...prevData,
        additionalInfo: `${prevData.additionalInfo}\nUploaded ${files.map((file) => file.name).join(', ')}`,
      }));

      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDeleteFile = (index) => {
    const fileName = uploadedFiles[index]?.name;
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    setFormData((prevData) => ({
      ...prevData,
      additionalInfo: prevData.additionalInfo
        .split('\n')
        .filter((line) => !line.includes(fileName))
        .join('\n'),
    }));
  };

  return (
    <div className="form-page">
      <h2>Generate Your Website</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="websiteType">What kind of website do you want to build?</label>
          <input
            type="text"
            id="websiteType"
            name="websiteType"
            value={formData.websiteType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="businessName">What is the name of your website?</label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="additional-info-container">
          <label htmlFor="additionalInfo">Add a description</label>
          <div
            className={`textarea-container ${isDragging ? 'dragging' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Drag and drop files here or type your message..."
            ></textarea>
            <div className="uploaded-files">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="file-icon">
                  <div className="delete-icon" onClick={() => handleDeleteFile(index)}>
                    ✖
                  </div>
                  <img
                    src="/file-icon.png" // Replace with your file icon path
                    alt="File Icon"
                    className="file-thumbnail"
                  />
                  <span className="file-name">{file.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default FormPage;
