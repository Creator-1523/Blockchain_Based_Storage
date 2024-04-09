import "./Display.css";
import { useState } from "react";

const DisplayText = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getTextData = async () => {
    let fetchedData;
    const otherAddress = document.querySelector(".address").value;

    try {
      if (otherAddress) {
        fetchedData = await contract.displayText(otherAddress);
        console.log(fetchedData); // Call contract function to get text data
      } else {
        fetchedData = await contract.displayText(account);
        console.log(fetchedData); // Call contract function to get text data
      }
    } catch (error) {
      alert(error);
    }
    console.log(fetchedData);

    setData(fetchedData || ""); // Set data or empty string if no data
  };

  return (
    <>
      <div className="text-display">{data}</div>
      {/* <input
        type="text"
        placeholder="Enter Address"
        className="address"
      /> */}
      <button className="center button" onClick={getTextData}>
        Get Text Data
      </button>
    </>
  );
};

export default DisplayText;
