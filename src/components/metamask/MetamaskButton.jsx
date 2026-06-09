import React, { useState } from "react";
// import  from "react";
import { BrowserProvider, formatEther } from "ethers";
import metamaskLogo from './assets/metamask_logo.png'
import './metamaskButton.css'

const MetamaskButton = () => {

    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [loading, setLoading] = useState(false);

    const clipAddress = (addr) => `${addr.slice(0, 7)}...${addr.slice(-5)}`;

    const resetWallet = () => {
        setAddress("");
        setBalance("");
    };

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask.");
            resetWallet();
            return;
        }

        try {
            setLoading(true);

            const provider = new BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);

            const walletAddress = accounts[0];
            const walletBalance = await provider.getBalance(walletAddress);

            setAddress(walletAddress);
            setBalance(formatEther(walletBalance));

        } catch (error) {
            console.error("Wallet connection failed:", error);
            resetWallet();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="metamask_button_container">
            <div
                className="mm-btn"
                style={{ backgroundImage: `url(${metamaskLogo})` }}
            />
                
            {address && (

                <div className="balance">
                    <div>Address: <span className="address">{clipAddress(address)}</span></div>
                    <div>Balance: {Number(balance).toFixed(4)} ETH</div>
                </div>
            )}

            <button onClick={address ? resetWallet : connectWallet} disabled={loading} className="metamask_button">
                {loading ? "Connecting..."
                : address ? 
                'Disconnect' : "Connect Wallet"}
            </button>
        </div>
    );
}
export default MetamaskButton;