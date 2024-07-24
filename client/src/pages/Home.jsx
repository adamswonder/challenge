import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser';

export default function Home() {
    const { user } = useAuth();
    const getUser = useUser()
    const [ethBalance, setEthBalance] = useState(null)

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        async function fetchEthBalance() {
            if (user?.ethereum_wallet_address) {
                const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY
                const provider = new ethers.providers.EtherscanProvider(null, apiKey)
                const balance = await provider.getBalance(user.ethereum_wallet_address)
                setEthBalance(ethers.utils.formatEther(balance))
            }
        }

        fetchEthBalance()
    }, [user])

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email !== undefined ? 
                            <div>
                                <p>Ethereum Wallet Balance: {ethBalance !== null ? `${ethBalance} ETH` : 'Fetching balance...'}</p>
                            </div> : 'Please login first'}
                    </div>
                </div>
            </h2>
        </div>
    )
}
