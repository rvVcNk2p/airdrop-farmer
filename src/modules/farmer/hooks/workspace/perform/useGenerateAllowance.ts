import { useState } from 'react'

import { useChooseInitialToken } from '../useChooseInitialToken'

type PerformAllowanceProps = {
	selectedNetworks: string[]
	wallet: string
}

export const usePerformAllowance = ({
	selectedNetworks,
	wallet,
}: PerformAllowanceProps) => {
	const [history, setHistory] = useState<string[]>([])

	const { historyMessage } = useChooseInitialToken({
		selectedNetworks,
		wallet,
	})

	const performAllowance = () => {
		setHistory((prev) => [...prev, historyMessage])
	}

	return {
		history,

		performAllowance,
	}
}
