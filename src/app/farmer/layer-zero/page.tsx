'use client'

import { FarmerPage } from '@modules/farmer/components/FarmerPage'
import { AirdropTypes } from '@modules/farmer/types'

const Home = () => {
	// TODO - Add beforeunload event guard
	// const onUnload = (e: BeforeUnloadEvent) => {
	// 	e.preventDefault()
	// 	return (e.returnValue = '')
	// }

	// useEffect(() => {
	// 	window.addEventListener('beforeunload', onUnload)

	// 	return () => {
	// 		window.removeEventListener('beforeunload', onUnload)
	// 	}
	// }, [])

	return <FarmerPage type={AirdropTypes.LAYER_ZERO} />
}

export default Home
