'use server'

import BillingPage from './BillingPage'

const BillingSSRPage = async () => {
	const managerPrivatekey = process.env.MANAGER_PRIVATE_KEY

	return (
		<>
			<BillingPage managerPrivatekey={managerPrivatekey} />
		</>
	)
}

export default BillingSSRPage
