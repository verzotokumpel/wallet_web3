import React, { useState, useEffect } from "react";
import { Divider, Tooltip, List, Avatar, Spin, Tabs, Input, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../noImg.png"
import axios from "axios";

function WalletView({wallet, setWallet, seedPhrase, setSeedPhrase, selectedChain}) {

  const navigate = useNavigate();
  const [tokens, setTokens] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [balance, setBalance] = useState(0);
  const [fetching, setFetching] = useState(true);

  const items = [
    {
      key: "1",
      label: "Transfer",
      children: (
        <>
          Transfer
        </>
      )
    },{
      key: "2",
      label: "NFTs",
      children: (
        <>
          {nfts ? (
            <>
             {nfts.map((e, i) => {
              return (
                <>
                  {e && (
                    <img 
                      key={i}
                      className="nftImage"
                      alt="nftImage"
                      src={e}
                    />
                  )}
                </>
              )
             })}
            </>
          ) : (
            <span>You seem to not have any NFT tokens yet</span>
          )}
        </>
      )
    },{
      key: "3",
      label: "Tokens",
      children: (
        <>
          {tokens ? (
            <>
              <List 
                bordered
                itemLayout="horizontal"
                dataSource={tokens}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta 
                      avatar={<Avatar src={item.logo || logo } />}
                      title={item.symbol}
                      description={item.name}
                    />
                    <div>
                      {(Number(item.balance) / 10 ** Number(item.decimals)).toFixed(2)}{" "}
                      Tokens
                    </div>
                  </List.Item>
                )}
              />
            </>
          ) : (
            <span>You seem to not have any tokens yet</span>
          )}
        </>
      )
    },
  ];

  async function getAccountTokens() {
    setFetching(true);

    const res = await axios.get('http://localhost:3001/getTokens', {
      params: {
        userAddress: wallet,
        chain: selectedChain,
      },
    });

    const response = res.data;

    if(response.tokens.length > 0) {
      setTokens(response.tokens);
    }

    if(response.nfts.length > 0) {
      setNfts(response.nfts);
    }

    setBalance(response.balance);

    setFetching(false);
  }

  useEffect(() => {
    if(!wallet || !selectedChain) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
    console.log(wallet);
  }, []);

  useEffect(() => {
    if(!wallet || !selectedChain) return;
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens();
  }, [selectedChain]);
  
  function logout(){
    setSeedPhrase(null);
    setWallet(null);
    navigate('/');
  }

  return (
    <>
      <div className="content">
        <div className="logoutButton" onClick={logout}>
          <LogoutOutlined />
        </div>
        <div className="walletName">Wallet</div>
        <Tooltip title={wallet}>
          <div>
              {wallet.slice(0, 4)}...{wallet.slice(38)}
          </div>
        </Tooltip>
        <Divider />
        <Tabs defaultActiveKey="1" items={items} className="walletView" />
      </div>
    </>
  );
}

export default WalletView;
