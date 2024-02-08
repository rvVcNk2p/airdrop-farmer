'use client'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import type { Connector } from 'wagmi'

const BillingPage = () => {
	const { address, status: accountStatus } = useAccount()
	const { connectors, connect, error } = useConnect()
	const { disconnect } = useDisconnect()

	const isUserConnected = () => accountStatus === 'connected'

	const renderMetamaskButton = () => {
		const metamaskConnector = connectors.find(
			(connector: Connector) => connector.name === 'MetaMask',
		)

		if (!metamaskConnector) return null

		return (
			<div className="m-2 flex items-center justify-between">
				<h2>Connect your wallet</h2>
				<button
					className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
					onClick={() => connect({ connector: metamaskConnector })}
					type="button"
				>
					{metamaskConnector.name}
				</button>
			</div>
		)
	}

	return (
		<>
			{isUserConnected() && (
				<div className="m-2 flex flex-col">
					<h1 className="text-2xl">Account</h1>

					<div className="flex items-center justify-between">
						<div>
							<span className="underline">Connected address:</span> {address}
						</div>

						{isUserConnected() && (
							<div className="mt-2 h-full w-auto">
								<button
									className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
									type="button"
									onClick={() => disconnect()}
								>
									Disconnect
								</button>
							</div>
						)}
					</div>
				</div>
			)}

			{!isUserConnected() && (
				<div>
					{renderMetamaskButton()}
					<div>{error?.message}</div>
				</div>
			)}
		</>
	)
}

export default BillingPage
