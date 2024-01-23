import React from 'react';
import mwallet from "../mwallet.png";
import { Button } from "antd";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className='content'>
      <img src={mwallet} alt="logo" className='frontPageLogo' />
      <h2>Hey There 😎</h2>
      <h4>Welcome to Your web3 wallet!</h4>
      <Button
        onClick={() => navigate("/yourwallet")}
        className='frontPageButton'
        type='primary'
      >
        Create New Wallet
      </Button>
      <Button
        onClick={() => navigate("/recover")}
        className='frontPageButton'
        type='default'
      >
        Sign In With Seed Phrase
      </Button>
      <p className='frontPageBottom'>
        Follow me on X:
        <a href="https://twitter.com/verzotokumpel" target='_blank' rel="noreferrer">
          verzo.eth
        </a>
      </p>
    </div>
  )
}

export default Home