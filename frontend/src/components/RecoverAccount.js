import React from "react";
import { BulbOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import TextArea from "antd/es/input/TextArea";

const { textArea } = Input;

function RecoverAccount({setWallet, setSeedPhrase}) {

  const navigate = useNavigate();

  const [nonValid, setNonValid] = useState(false);
  const [typedSeed, setTypedSeed] = useState("");

  function seedAdjust(e) {
    setNonValid(false);
    setTypedSeed(e.target.value);
  }

  function recoverWallet(){
    let recoveredWallet;
    try {
      recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
    } catch(err){
      setNonValid(false);
      return;
    }

    setSeedPhrase(typedSeed);
    setWallet(recoveredWallet.address)
    navigate("/yourwallet")
  }

  return (
    <>
      <div className="content">
        <div className="mnemonic">
            <BulbOutlined style={{fontSize:"20px"}}/>
            <div>
              Type your seed phrase in the field.
            </div>
        </div>
        <TextArea 
          rows={4}
          onChange={seedAdjust}
          className="seedPhraseContainer"
          placeholder="Type your seed phrase here..."
        />
        <Button
          disabled={
            typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "
          }
          className="frontPageButton"
          type="primary"
          onClick={() => recoverWallet()}
        >
          Recover Wallet
        </Button>
        <p style={{color: "red"}}>{!nonValid ? "wrong seed!" : ""}</p>
        <p className="frontPageButton" onClick={() => navigate("/")}>
          Back Home
        </p>
      </div>
    </>
  );
}

export default RecoverAccount;
