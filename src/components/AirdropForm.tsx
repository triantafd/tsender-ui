'use client'

import { useState, useMemo, useEffect } from 'react'
import { AiTwotoneAlert } from "react-icons/ai"
import { useChainId, useWriteContract, useAccount, useWaitForTransactionReceipt, useReadContracts } from 'wagmi'
import { chainsToTSender, tsenderAbi, erc20Abi } from '@/constants'
import { readContract } from "@wagmi/core"
import { useConfig } from 'wagmi'
import { CgSpinner } from "react-icons/cg";
import { calculateTotal, formatTokenAmount } from '@/utils'

interface AirdropFormProps {
    isUnsafeMode: boolean
    onModeChange: (unsafe: boolean) => void
}

export default function AirdropForm({ isUnsafeMode, onModeChange }: AirdropFormProps) {
    const [tokenAddress, setTokenAddress] = useState('')
    const [recipients, setRecipients] = useState('')
    const [amounts, setAmounts] = useState('')
    const config = useConfig()
    const account = useAccount()
    const chainId = useChainId()
    const { data: tokenData } = useReadContracts({ contracts: [{ abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'decimals' }, { abi: erc20Abi, address: tokenAddress as `0x${string}`, functionName: 'name' }] })
    // TODO: See what's in error to see what we should display to user.
    const { data: hash, isPending, error, writeContract } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    const total: number = useMemo(() => calculateTotal(amounts), [amounts])

    async function handleSubmit() {
        const contractType = isUnsafeMode ? "no_check" : "tsender"
        const tSenderAddress = chainsToTSender[chainId][contractType]
        const result = await getApprovedAmount(tSenderAddress)

        // This should be a promise, this is weird wagmi design
        if (result < total) {
            writeContract({
                abi: erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: 'approve',
                args: [tSenderAddress as `0x${string}`, total.toString()],
            })
            // {
            //     // onSuccess: () => { console.log("Approved!") },
            //     onError: (error) => {
            //         alert("Error approving, see console!")
            //         console.log(error)
            //     },
            //     // onSettled: () => { console.log("wtf") }
            // })
        }

        writeContract({
            abi: tsenderAbi,
            address: tSenderAddress as `0x${string}`,
            functionName: 'airdropERC20',
            args: [tokenAddress, recipients.split(','), amounts.split(',').map(amt => amt.trim()), total.toString()],
        })
    }

    async function getApprovedAmount(tSenderAddress: string | null): Promise<number> {
        if (!tSenderAddress) {
            alert("This chain only has the safer version!")
            return 0
        }
        const response = await readContract(config, {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: 'allowance',
            args: [account.address, tSenderAddress as `0x${string}`]
        })
        return response as number
    }

    function getButtonContent() {
        if (isPending) return (
            <div className="flex items-center justify-center gap-2 w-full">
                <CgSpinner className="animate-spin" size={20} />
                <span>Confirming...</span>
            </div>
        )
        if (isConfirming) return (
            <div className="flex items-center justify-center gap-2 w-full">
                <CgSpinner className="animate-spin" size={20} />
                <span>Waiting for confirmation...</span>
            </div>
        )
        if (isConfirmed) return 'Transaction confirmed.'
        return isUnsafeMode ? 'Send Tokens (Unsafe)' : 'Send Tokens'
    }

    return (
        <div className={`max-w-2xl mx-auto p-6 ${isUnsafeMode ? 'border-2 border-red-500 rounded-lg' : 'border-2 border-blue-500 rounded-lg'}`}>
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => onModeChange(false)}
                    className={`p-3 border-2 border-blue-500 text-blue-600 rounded-lg ${!isUnsafeMode ? 'bg-blue-50 text-blue-600' : 'cursor-pointer hover:bg-gray-50'}`}
                >
                    Safety Checks Mode
                </button>
                <button
                    onClick={() => onModeChange(true)}
                    className={`p-3 flex items-center gap-2 rounded-lg ${isUnsafeMode
                        ? 'bg-red-50 text-red-600 border-2 border-red-500'
                        : 'cursor-pointer text-red-500 border-2 border-red-500 hover:bg-red-50'
                        }`}
                >
                    <AiTwotoneAlert size={20} />
                    Unsafe Mode
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Token Address</label>
                    <input
                        type="text"
                        value={tokenAddress}
                        onChange={(e) => setTokenAddress(e.target.value)}
                        placeholder="0x..."
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Recipients (comma separated)</label>
                    <textarea
                        value={recipients}
                        onChange={(e) => setRecipients(e.target.value)}
                        placeholder="0x123..., 0x456..."
                        className="w-full p-2 border rounded-lg h-20 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Amounts (wei, comma separated)</label>
                    <textarea
                        value={amounts}
                        onChange={(e) => setAmounts(e.target.value)}
                        placeholder="100, 200, 300..."
                        className="w-full p-2 border rounded-lg h-20 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div className="bg-gray-50 border rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Transaction Details</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Token Name:</span>
                            <span className="font-mono text-gray-900">{tokenData?.[1]?.result as string}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Amount (wei):</span>
                            <span className="font-mono text-gray-900">{total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Amount (tokens):</span>
                            <span className="font-mono text-gray-900">{formatTokenAmount(total, tokenData?.[0]?.result as number)}</span>
                        </div>
                    </div>
                </div>

                {isUnsafeMode && (
                    <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
                        <AiTwotoneAlert size={20} />
                        <span>Using unsafe super gas optimized mode</span>
                        <div className="relative group">
                            <div className="cursor-help ml-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                                    />
                                </svg>
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-64">
                                This mode skips certain safety checks to optimize for gas. Do not use this mode unless you know how to verify the calldata of your transaction.
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1 border-8 border-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    className={`cursor-pointer w-full p-3 rounded-lg text-white transition-colors ${isUnsafeMode
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    onClick={handleSubmit}
                    disabled={isPending}
                >
                    {isPending ? getButtonContent()
                        : isConfirming ? getButtonContent()
                            : isUnsafeMode ? 'Send Tokens (Unsafe)'
                                : 'Send Tokens'}
                </button>
            </div>
        </div>
    )
}