import "./FileUpload.css";
import { useState } from "react";
import axios from "axios";

const FileUpload = ({ contract, account }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  //handle image or file =to upload the image on ipfs
  //retrive file

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `130a541d1a0a0913eddb`,
            pinata_secret_api_key: `
                b355245ca6e2b2ab605ad674c8b942d3f08fc79d952d1cf5b12151f6cda24437`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash=`https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        contract.add(account,ImgHash);
        alert("Successfully File Uploaded");
        setFileName("No file is selected");
        setFile(null);
      } catch (error) {
        alert(error);
      }
    }
  };

  const retriveFile = (event) => {
    console.log("hello");

    const data = event.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(event.target.files[0]);
    };
    console.log(event.target.files[0].name);
    setFileName(event.target.files[0].name);
    event.preventDefault();
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose File
        </label>
        <input
          type="file"
          id="file-upload"
          name="data"
          onChange={retriveFile}
          disabled={!account}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
