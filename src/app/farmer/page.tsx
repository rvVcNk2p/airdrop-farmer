'use client'

import { FarmerPage } from '@modules/farmer/components/FarmerPage'
import { useEffect } from 'react'

const Home = () => {
	const onUnload = (e: BeforeUnloadEvent) => {
		e.preventDefault()
		return (e.returnValue = '')
	}

	useEffect(() => {
		window.addEventListener('beforeunload', onUnload)

		return () => {
			window.removeEventListener('beforeunload', onUnload)
		}
	}, [])

	return <FarmerPage />
}

export default Home
