import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import "bulma/css/bulma.css"
import Web3 from "web3";
import ethereumLotteryContract from "../vendor/main";

import {useState, useEffect} from 'react';

export default function Home() {

    const [web3Context, setWeb3Context] = useState();
    const [account, setAccount] = useState()
    const [admin, setAdmin] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [time, setTime] = useState(0);
    const [lotteryContext, setLotteryContext] = useState();
    const [currentLotteryIndex, setCurrentLotteryIndex] = useState();
    const [history, setHistory] = useState([]);
    const [balance, setBalance] = useState();
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (lotteryContext) {
            refresh()
        }
    }, [lotteryContext])
    useEffect(() => {
        if (isLoading) {
            refresh()
        }
    }, [isLoading])

    useEffect(() => {
        if (account !== undefined && lotteryContext !== undefined) {
            console.log(admin, "admin")
            console.log(account, "account")
            setIsAdmin(admin === account)
            setIsApplied(players.some(k => k === account))
        }
    }, [account, admin])

    const getAdminAccount = async () => {
        const index = await lotteryContext.methods.admin().call()
        setAdmin(index)
    }
    const getBalance = async () => {
        const balance = await lotteryContext.methods.getBalance().call()
        setBalance(web3Context.utils.fromWei(balance, 'ether'))
    }
    const getPlayers = async () => {
        const players = await lotteryContext.methods.getPlayers().call()
        console.log(players, "players")
        setPlayers(players)
    }
    const getLotteryHistory = async (currentIndex) => {
        let result = []
        for (let index = currentIndex - 1; index > 0; index--) {
            const lotteryHistory = await lotteryContext.methods.getLotteryHistory(index).call();
            if (index !== null && index !== 0) {
                result.push({
                    winner: lotteryHistory[0],
                    totalParticipant: lotteryHistory[2],
                    totalBalance: lotteryHistory[3]
                })
            }
        }
        setHistory(result)
    }
    const endLottery = async () => {
        if (metaMaskFailed()) return;
        console.log(lotteryContext)
        try {
            setIsLoading(true)

            await lotteryContext.methods.endLottery().send({
                from: account,
                gas: 300000,
                gasPrice: null
            })
            setIsLoading(false)

        } catch (e) {
            setIsLoading(false)
            alert(e.message)
        }

        refresh()
    }
    const refresh = () => {
        if (lotteryContext !== undefined) {
            getBalance()
            getPlayers()
            getTimeLeft()
            getLotteryIndex()
            getAdminAccount()
        }
    }

    const getTimeLeft = async () => {
        const timeLeft = await lotteryContext.methods.getTimeLeft().call()
        setTime(timeLeft)
        var countDown = 0
        setInterval(() => {
            if (timeLeft !== "0") {
                countDown++
                let value = timeLeft - countDown
                setTime(value)
            } else {

            }
        }, 1000)
    }
    const getLotteryIndex = async () => {
        const index = await lotteryContext.methods.currentLotteryIndex().call()
        setCurrentLotteryIndex(index)
        await getLotteryHistory(index)
    }
    const applyLottery = async () => {
        if (metaMaskFailed()) return;
        try {
            setIsLoading(true);
            await lotteryContext.methods.enter().send({
                from: account,
                value: '15000000000000000',
                gas: 200000,
                gasPrice: null,
            })
            setIsLoading(false);
            refresh()
        } catch (e) {
            console.log(e)
            alert(e.message)
            setIsLoading(false);
        }

    }

    const getWallet = async () => {

        setIsLoading(true);
        await window.ethereum.request({method: "eth_requestAccounts"})

        const web3Context = new Web3(window.ethereum);
        setWeb3Context(web3Context);

        const accountList = await web3Context.eth.getAccounts();
        setAccount(accountList[0]);

        const contract = ethereumLotteryContract(web3Context)
        setLotteryContext(contract)
        setIsLoading(false);
    }


    const metaMaskFailed = () => {
        if (typeof window === "undefined" && typeof window.ethereum === "undefined") {
            alert("Please install MetaMask")
            return true
        }
        console.log(lotteryContext)
        if (lotteryContext === undefined) {
            alert("Please connect MetaMask")
            return true
        }
        return false;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>SWE 599</title>
                <meta name="description"
                      content="this is a SWE 599 Project includes lottery system with ethereum blockchain"/>
            </Head>
            <main>
                <div className="container is-fullhd ">
                    <nav className="panel">
                        <p className="panel-heading is-flex  is-align-items-center is-justify-content-space-between ">
                            <i className="is-align-self-auto">Ethereum Lottery</i>

                            <b>Remaining time for next draw: {new Date(time * 1000).toISOString().substring(11, 19)}</b>

                            <button onClick={getWallet} className="button is-danger " disabled={isLoading}>Get
                                Wallet
                            </button>
                        </p>
                        <div className="panel-block">
                            <div
                                className="container is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                                <div className="box m-0">
                                    <div className="field">
                                        <label className="label">Buy Your Lottery Tickets Online</label>
                                        <div className="control">
                                            1 ticket : 0.015 ETHER
                                        </div>
                                    </div>
                                    <button onClick={applyLottery} disabled={isLoading}
                                            className="button is-success is-link">Buy
                                    </button>
                                </div>
                                {isLoading === true ? (
                                    <div className={`${"field"} ${styles.anim}`}>
                                        <label
                                            className="label has-background-danger has-text-white-bis">Waiting
                                            for
                                            transaction </label>
                                    </div>) : ""}
                                <div className="box">
                                    <div className="field">
                                        <h1 className="title">Participants</h1>
                                        <h2>Total Balance : <b>{balance} Ether</b></h2>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>Order</th>
                                                <th>Blockchain ID</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                players.map((val, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th>{index + 1}</th>
                                                            <td>
                                                                {val}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="panel-block">
                            <div className="field">
                                <h1 className="title">History</h1>

                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Winner ID</th>
                                        <th>Total Participants</th>
                                        <th>Total Balance</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        history.map((val, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        {val.winner}
                                                    </td>
                                                    <td>
                                                        {val.totalParticipant}
                                                    </td>
                                                    <td>
                                                        {web3Context.utils.fromWei(val.totalBalance, 'ether')}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {isAdmin ? (<div className="panel-block">
                            <button onClick={endLottery} disabled={isLoading}
                                    className="button is-link is-outlined is-fullwidth">
                                Finish The Lottery
                            </button>
                        </div>) : ""}
                    </nav>
                </div>
            </main>

            <footer className={styles.footer}>
                <p> Created By Sabri Korkmaz</p>
            </footer>
        </div>
    )
}

