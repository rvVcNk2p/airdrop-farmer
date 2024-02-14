import { FormDoubleFieldInputWrapper } from '@modules/shared/components/Form'

export const TimeIntervalsSection = ({ form }: { form: any }) => {
	return (
		<div>
			<h1 className="text-lg">Time Intervals</h1>

			<div className="mt-2 flex flex-col gap-4">
				<FormDoubleFieldInputWrapper
					label="Sleep interval after transaction:"
					name1="firstStepFileds.timeIntervals.timeIntervalAfterTransactions.from"
					name2="firstStepFileds.timeIntervals.timeIntervalAfterTransactions.to"
					type="number"
					iconLabel="Sec"
					form={form}
				/>
				<FormDoubleFieldInputWrapper
					label="Sleep interval after approval:"
					name1="firstStepFileds.timeIntervals.sleepIntervalAfterApproval.from"
					name2="firstStepFileds.timeIntervals.sleepIntervalAfterApproval.to"
					type="number"
					iconLabel="Sec"
					form={form}
				/>
			</div>
		</div>
	)
}
