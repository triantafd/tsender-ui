'use client'

import { ConnectKitButton } from 'connectkit'
import { FaGithubSquare } from "react-icons/fa";
import { AiTwotoneAlert } from "react-icons/ai";

export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">TSender</h1>
            <div className="flex flex-row items-center">
                <div className="mr-4 p-6 rounded-lg">
                    Gas Optimized Airdrop
                </div>
                <a
                    href="https://github.com/cyfrin/TSender"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-4 p-6"
                >
                    <FaGithubSquare size={50} />
                </a>
                <ConnectKitButton />
            </div>
        </nav>
    )
}


