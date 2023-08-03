import DefaultAccordion from '@modules/shared/components/atoms/DefaultAccordion'
import { v4 as uuidv4 } from 'uuid'

// TODO: DISCORD URK

const DISCORD_URL = 'https://discord.gg/'

const Faq = () => {
	const faqs = [
		{
			id: uuidv4(),
			title: 'Do you keep private keys?',
			content:
				'No. We provide a farming option that does not require us to store your private keys. Instead, they are only stored securely in your browser, which technically means they are completely safe and we do not have access to them. We use them to sign transactions on your device in the background.<br/><br/>We also have an option to use farmer without private keys, than you will sign transactions manually with metamask.<br><br>Furthermore, we understand that our reputation rests on our commitment to honesty and integrity. That is why we would never consider engaging in fraudulent or unethical activities that could harm our users or our reputation. We are dedicated to building great products that benefit everyone in the long term and the numbers reflect this approach. Playing win win game.',
		},
		{
			id: uuidv4(),
			title: 'Why not to use the tool just for yourself?',
			content:
				'Building products, infrastructure and brand are more profitable in the future than farming airdrops alone. The opportunities that trust opens up with people and sharing value with the community are much more valuable than money from airdrops for us.',
		},
		{
			id: uuidv4(),
			title: 'Can I become sybil due to the bot activity?',
			content:
				'To be identified as Sybil you need to do four things:<br>1. Link addresses farming same airdrop between each other<br>2. Send same amount in the same time to multiple addresses from CEX<br>3. Farm from one wallet multiple airdrops<br>4. Do the same sequence of actions at the same time<br>On our part system completely randomizes the actions taken by your wallets to eliminate any potential identification them as Sybil. Even wallets within the same group will have different timings, orders, and sums, ensuring a diverse and unpredictable strategy. On your part, you must make sure that you do not allow 1, 2 and 3 points.',
		},
		{
			id: uuidv4(),
			title: 'Can I run the bot for multiple wallet groups at the same time?',
			content:
				'Yes, you can create up to 20 groups of wallets, which will work on different strategies, scripts will run in parallel.',
		},
		{
			id: uuidv4(),
			title:
				'Is it possible to make the bot work specifically for my strategy, goals and needs?',
			content:
				'Yes. On Pro plan we can help you to automate your routine will 100+ wallets and create custom solutions for you. Open ticket in our Discord to discuss your case. If the team will approve your candidacy, we will work with you.',
		},
		{
			id: uuidv4(),
			title: 'Does the bot make the interval between transactions?',
			content:
				'Yes, the bot makes a random interval between every transaction. You could also set the interval manually.',
		},
		{
			id: uuidv4(),
			title:
				'Can it happen that the bot will interrupt and not complete its work? What will happen to the money in the wallet?',
			content:
				'If an error happens, you will see which wallet is the problem and you will be able to restart the script. The money will remain on your wallet.',
		},
		{
			id: uuidv4(),
			title: 'Do the bot have randomization among a group of accounts?',
			content:
				'Yes, you set the randomization ratio yourself before running the script.',
		},
		{
			id: uuidv4(),
			title: 'Is there a minimum amount that must be in the wallet?',
			content:
				'Yes, it depends on what criteria and goals of the script you choose. In order for the script to be executed to the end, the amount in the wallet must not be less than the amount that will be shown when you set up the script.',
		},
		{
			id: uuidv4(),
			title: 'Is there a risk that the accounts will turn out to be sibyls?',
			content:
				'There is no risk to be identified as sibyl. Here’s why:<ul class="list-none"><li>1. Your wallets are not linked together</li><li>2. Actions our script do are completely random: random time, bridges, amounts, volumes and networks.</li></ul>',
		},
		{
			id: uuidv4(),
			title: 'Do I need to download something on my computer?',
			content: 'No, Copilot Airdrop Farmer is the web application.',
		},
		{
			id: uuidv4(),
			title: 'Why is your software better than others?',
			content:
				'Unlike other software that offers you one script for all accounts with only one bridge function, Сopilot has the strongest customization and randomization of the script. So your chances of getting a juicy drop are greatly increased.',
		},
		{
			id: uuidv4(),
			title: 'Is the price of a monthly subscription fixed?',
			content:
				'No. The price will increase from month to month with each product update and with the addition of new Airdrops.',
		},
		{
			id: uuidv4(),
			title: 'Can I upgrade my plan?',
			content: 'No, you can not upgrade your plan.',
		},
		{
			id: uuidv4(),
			title: 'Why can I trust you?',
			content:
				'Сopilot has a proven technical background, our products are used by over a thousand people for more than 9 months. Our ambition is to become the #1 airdrop automation software in the world and we are not interested in scamming our users.',
		},
		{
			id: uuidv4(),
			title: 'Will you support other airdrops later?',
			content: `Yes, if you want to automate any airdrop that we don nott have, contact us on <a href="${DISCORD_URL}" target="_blank" rel="noreferrer" class="text-main-color cursor-pointer">Discord</a></p>`,
		},
		{
			id: uuidv4(),
			title: 'What Is a Crypto Airdrop?',
			content:
				'Crypto airdrop is a marketing strategy to promote the Web3 project and their new token. It involves distributing their native cryptocurrency to current or potential users for free. There are different types of airdrops, but most airdrops have the same goal: increase awareness and overall interest in the project.',
		},
		{
			id: uuidv4(),
			title: 'What Is LayerZero Airdrop?',
			content:
				'LayerZero is an omnichain interoperability protocol designed for lightweight message passing across chains. LayerZero provides authentic and guaranteed message delivery with configurable trustlessness.</p><br>LayerZero doesn’t have an own token yet but they have raised more than $280M in funding from investors like Alameda Research and Andreessen Horowitz so it’s very likely that they will launch a token in the future. Users who use the dApps built on LayerZero may get an airdrop if they launch an own token.',
		},
		{
			id: uuidv4(),
			title: 'What Is zkSync Airdrop?',
			content:
				'zkSync is a ZK rollup, a trustless protocol that uses cryptographic validity proofs to provide scalable and low-cost transactions on Ethereum. In zkSync, computation is performed off-chain and most data is stored off-chain as well. As all transactions are proven on the Ethereum mainchain, users enjoy the same security level as in Ethereum.<br><br>zkSync has raised a total of $458 million from leading investors like Blockchain Capital and Dragonfly Capital. They’ve hinted that they will launch their native token in the future, so trying out their mainnet may make you eligible for an airdrop when they launch their token.',
		},
		{
			id: uuidv4(),
			title: 'What Is StarkNet Airdrop?',
			content:
				'StarkNet is a permissionless decentralized Validity-Rollup (also known as a “ZK-Rollup”). It operates as an L2 network over Ethereum, enabling any dApp to achieve unlimited scale for its computation – without compromising Ethereum’s composability and security, thanks to StarkNet’s reliance on the safest and most scalable cryptographic proof system – STARK.<br><br>StarkNet has confirmed to launch an own token and 9% of the total supply has been allocated to end users and developers who’ve built dApps using StarkNet. StarkNet end users are those who used dApps built on StarkNet. StarkNet dApps include dydx, Immutable, Celer, DeversiFi, Argent and many more. So early users who’ve StarkNet Dapps by the snapshot date are likely to be eligible for the airdrop.',
		},
		{
			id: uuidv4(),
			title: 'How do I increase the chances of getting a drop?',
			content:
				'<ul class="text-lg text-main-airdrop pr-6"><li>1. Warm up accounts: Empty accounts with no transactions are suspicious to the project. It is recommended that you perform at least small transactions on various networks before participating in the drop. It is important that these transactions are not made on the same day. It is better to accumulate them over a long period of time and in different networks.</li> <br><li>2. Transaction variety: If you create a wallet and make 1000 transactions in one day, you may be excluded from participation if the project screens out users based on activity. So keep your wallets open and do occasional transactions, both in other networks and in the network from which you want to get the drop. Do activity once a week or a couple of weeks for a few months.</li> <br><li>3. Transaction volume: It is recommended that you make as many transactions as possible, with each transaction adding up. If you don not have the ability to spend large amounts, try to run accounts of $1,000 or more. This can increase your chances of getting a drop and the number of tokens you get.</li> <br><li>4. Participate in project votes and events: Participate in project votes on the Snapshot platform, if available. Also participate in events hosted by the project.</li></ul>',
		},
	]
	return (
		<section className="px-8 py-16 md:py-36" id="faq">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8 md:mb-20">
					<h1 className="font-semibold text-3xl md:text-5xl text-center text-white uppercase mb-4 md:mb-6">
						FAQ
					</h1>
					<p className="text-xl md:text-2xl text-center text-main-airdrop">
						If you still have questions
					</p>
				</div>
				<div className="max-w-3xl mx-auto">
					{faqs.map((faq, index) => (
						<DefaultAccordion
							key={index}
							id={faq.id}
							title={faq.title}
							content={faq.content}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default Faq
