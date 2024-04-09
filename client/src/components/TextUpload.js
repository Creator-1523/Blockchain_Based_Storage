import { useState } from "react";
import "./FileUpload.css";

const TextUpload = ({ contract, account }) => {
  const [textData, setTextData] = useState("");

  const textSubmit = async (event) => {
    event.preventDefault();

    if (textData) {
      try {
        contract.addText(account, textData); // Call your contract function with text data
        alert("Successfully Uploaded Text Data");
        setTextData("");
      } catch (error) {
        alert(error);
      }
    }
  };
  return (
    <div className="top">
      <form className="form" onSubmit={textSubmit}>
        <label htmlFor="text-data" className="choose">
          Enter Text
        </label>
        <textarea
          id="text-data"
          value={textData}
          onChange={(e) => setTextData(e.target.value)}
          disabled={!account}
        />
        <button type="submit" className="upload" disabled={!textData}>
          Upload Text
        </button>
      </form>
    </div>
  );
};

export default TextUpload;
