import { useState } from "react";
import { FileUpload } from "../services/oprations/task";
import { useNavigate } from "react-router-dom";

const CSVUpload = () => {
  const [file, setFile] = useState(null); // Store file object
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid CSV file.");
      setFile(null);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "text/csv") {
      setFile(droppedFile);
    } else {
      alert("Please upload a valid CSV file.");
      setFile(null);
    }
  };

  const handelupload = (e) => {
    e.preventDefault();

    console.log(file);
    FileUpload(file, navigate);
  };

  return (
    <div>
      <div
        className="w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6 bg-white text-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
          accept=".csv"
          onChange={handleFileChange}
        />
        <div>
          <img
            className="mx-auto h-12 w-12"
            src="https://www.svgrepo.com/show/357902/image-upload.svg"
            alt="Upload Icon"
          />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            <span className="cursor-pointer text-indigo-600">Drag & drop</span>{" "}
            <span>or browse to upload</span>
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Only CSV files (Max 10MB)
          </p>
        </div>
        {file && (
          <p className="mt-4 text-sm text-gray-700 font-semibold">
            📂 {file.name}
          </p>
        )}
      </div>
      <button
        className="w-full bg-indigo-500 text-white mt-3 text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        onClick={handelupload}
      >
        Upload
      </button>
    </div>
  );
};

export default CSVUpload;
