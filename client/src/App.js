import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { BrowserProvider, ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";
import TextUpload from "./components/TextUpload";
import DisplayText from "./components/DisplayText";
import Main from "./components/Main";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log(ethers.version);
    const provider = new ethers.BrowserProvider(window.ethereum);

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const wallet = async () => {
      if (provider) {
        await provider.send("eth_requestAccounts", []);
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
        setAccount(address);

        const contractAddress = "0x62f9801858D5Ad0A32f2f613758CCdE7617E2a65";
        const contract = new ethers.Contract( 
          contractAddress,
          Upload.abi,
          signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(signer);
      } else {
        alert("MetaMask is not installed");
      }
    };
    provider && wallet();
  }, []);

  return (
    <>
     {/* {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {
        modalOpen && (
          <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
        )
      } */}
      
    <div className="App">
      <h1 style={{ color: "white" }}>File Sharing</h1>
      <div class="bg"></div>
      <div class="bg bg2"></div>
      <div class="bg bg3"></div>

      <p style={{ color: "white" }}>Account : {account}</p>
      
      <FileUpload account={account} contract={contract}></FileUpload>
      <Display account={account} contract={contract}></Display>
      <TextUpload account={account} contract={contract}></TextUpload>
      <DisplayText account={account} contract={contract}></DisplayText>
    </div>
    </>
  );
}

export default App;
