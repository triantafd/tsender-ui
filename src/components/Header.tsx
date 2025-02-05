'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaGithubSquare } from "react-icons/fa";

export default function Header() {
    return (

        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">TSender</h1>
            <h3 className="italic text-left">Batch airdrop tokens and spend the least gas</h3>
            <div className="flex flex-row items-center">
                <a
                    href="https://github.com/cyfrin/TSender"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-4 p-6"
                >
                    <FaGithubSquare size={50} />
                </a>
                <ConnectButton />
            </div>
        </nav>
    )
}


