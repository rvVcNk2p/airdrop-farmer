'use client'

import { FarmerPage } from '@modules/farmer/components/FarmerPage'
import { FarmerOption } from '@modules/farmer/types'

const Home = () => {
	return <FarmerPage type={FarmerOption.ZKSYNC} />
}

export default Home
