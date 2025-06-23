import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./GeneratedWebsite.css";

const GeneratedWebsite = () => {
  const location = useLocation();
  const [generatedWebsite, setGeneratedWebsite] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!location.state) {
      console.error("No data found in location.state");
      return;
    }
    generateWebsite(); // Generate website on load
  }, []);

  const generateWebsite = async () => {
    setIsLoading(true);
    const formData = new FormData();

    if (location.state.uploadedFiles && location.state.uploadedFiles.length > 0) {
      formData.append("file", location.state.uploadedFiles[0]); // Send first file
      formData.append("websiteType", location.state.websiteType);
      formData.append("businessName", location.state.businessName);
      formData.append("additionalInfo", location.state.additionalInfo);
      formData.append("palette", JSON.stringify(location.state.palette));
      formData.append("font", location.state.font);
      formData.append("layout", location.state.layout);

      const response = await fetch("http://localhost:3001/api/file", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setGeneratedWebsite(data.message);
    } else {
      const response = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          websiteType: location.state.websiteType,
          businessName: location.state.businessName,
          additionalInfo: location.state.additionalInfo,
          palette: location.state.palette,
          font: location.state.font,
          layout: location.state.layout,
        }),
      });

      const data = await response.json();
      setGeneratedWebsite(data.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="generated-website-container">
      {isLoading ? (
        <p>Generating website...</p>
      ) : (
        <iframe title="Website Preview" className="website-preview" srcDoc={generatedWebsite} />
      )}
    </div>
  );
};

export default GeneratedWebsite;
