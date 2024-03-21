'use client'

import { FarmerPage } from '@modules/farmer/components/FarmerPage'
import { AirdropTypes } from '@modules/farmer/types'

const Home = () => {
	return <FarmerPage type={AirdropTypes.SCROLL} />
}

export default Home
