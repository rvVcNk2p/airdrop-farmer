import { Address } from 'viem'
import { TxHistoryRecordType, TxStatusType } from '@modules/farmer/types'
import { randomIntFromInterval, sleep } from '@modules/shared/utils'
import { privateKeyToAccount } from 'viem/accounts'

type RandomSleepAndLogProps = {
	wallet: Address
	loggerFn: ({}: TxHistoryRecordType) => void
	min?: number
	max?: number
}

export const randomSleepAndLog = async ({
	wallet,
	loggerFn,
	min = 5,
	max = 30,
}: RandomSleepAndLogProps) => {
	const sleepingTime = randomIntFromInterval(min, max)
	loggerFn({
		wallet: privateKeyToAccount(wallet).address,
		message: `Sleeping ${sleepingTime} second.`,
	})
	await sleep(sleepingTime)
}
