import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import "bulma/css/bulma.css"
import Web3 from "web3";
import ethereumLotteryContract from "../vendor/main";


import {useState} from 'react';

export default function Home() {

    const [web3Context, setWeb3Context] = useState();
    const [accountList, setAccountList] = useState()
    const getWallet = async () => {
        if (metaMaskFailed()) return;
        await window.ethereum.request({method: "eth_requestAccounts"})

        const ethereumContext = new Web3(window.ethereum);
        setWeb3Context(ethereumContext);

        const accountList = await web3Context.eth.getAccounts();
        setAccountList(accountList[0]);
    }


    const metaMaskFailed = () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            return false;
        } else {
            alert("Please install MetaMask")
            return true
        }
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

                            <b>Remaining time for next draw: 18:06:49</b>

                            <button onClick={getWallet} className="button is-danger ">Get Wallet</button>
                        </p>
                        <div className="panel-block">
                            <div
                                className="container is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center">
                                <form className="box m-0">
                                    <div className="field">
                                        <label className="label">Buy Your Lottery Tickets Online</label>
                                        <div className="control">
                                            1 ticket : 0.1 ETHER
                                        </div>
                                    </div>
                                    <button className="button is-success">Buy</button>
                                </form>
                                <form className="box">
                                    <div className="field">
                                        <h1 className="title">Participants</h1>

                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>Order</th>
                                                <th>Blockchain ID</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th>1</th>
                                                <td>
                                                    0xE885S8AF6S8A64A6S5DF8E6A65D8F4E6S
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <div className="panel-block">
                            <div className="field">
                                <h1 className="title">History</h1>

                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Total Participants</th>
                                        <th>Winner ID</th>
                                        <th>Total Pot</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th>18.05.2022 18:00</th>
                                        <th>15</th>
                                        <th>0xE564a654saA66as4d3A64AS</th>
                                        <th>1.5 ETHER</th>

                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="panel-block">
                            <button className="button is-link is-outlined is-fullwidth">
                                Reset all filters
                            </button>
                        </div>
                    </nav>
                </div>
            </main>

            <footer className={styles.footer}>
                <p> Created By Sabri Korkmaz</p>
            </footer>
        </div>
    )
}
