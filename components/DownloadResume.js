'use client'
import React, { useState } from "react";
import { Button } from "@components/ui/button"; // Custom Button component (optional)
import { Label } from "./ui/label";

const CustomFileUpload = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Set file name for UI feedback
      onFileSelect(file); // Pass the file back to parent
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {/* Custom styled button */}
      <Label htmlFor="fileUpload" className="cursor-pointer">
        <Button
          type="button"
          className="text-white transition-all bg-blue-500 hover:bg-blue-600"
        >
          {fileName ? "Change File" : "Upload File"}
        </Button>
      </Label>

      {/* Hidden input element */}
      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }} // Hides the file input
      />

      {/* File name display */}
      {fileName && (
        <p className="text-sm text-gray-600">
          Selected file: <strong>{fileName}</strong>
        </p>
      )}
      <button type=""></button>
    </div>
  );
};

export default CustomFileUpload;
