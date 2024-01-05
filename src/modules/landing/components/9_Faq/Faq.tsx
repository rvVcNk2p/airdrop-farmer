import DefaultAccordion from '@modules/shared/components/atoms/DefaultAccordion'
import { discordLink } from '@modules/shared/constants'
import { v4 as uuidv4 } from 'uuid'

const Faq = () => {
	const faqs = [
		{
			id: uuidv4(),
			title: 'Do you keep my private keys?',
			content:
				'No. Introducing our unique farming option that ensures utmost security for your private keys. Unlike other platforms, we never store your private keys. Instead, they remain securely within your browser, making them completely safe and inaccessible to us. Your transactions are seamlessly signed on your device in the background. <br/> <br/> At our core, we value honesty and integrity. Our commitment to you, our users, and our reputation is unwavering. We pledge to never engage in fraudulent or unethical activities that could jeopardize your trust in us. Our focus is on building exceptional products that bring long-term benefits to all, fostering a true win-win environment. Playing win win game.',
		},
		{
			id: uuidv4(),
			title:
				'Why limit ourselves to using the tool exclusively for personal gain?',
			content:
				'By concentrating on developing products, establishing a robust infrastructure, and cultivating a reputable brand, we are poised for greater long-term profitability compared to solely relying on airdrop farming. <br/><br/>The immense potential that arises from fostering trust among individuals and contributing value to the community holds far more significance for us than mere airdrop earnings.',
		},
		{
			id: 'can-i-become-sybil',
			title: 'Can I become sybil due to the bot activity?',
			content:
				'To be identified as Sybil you need to do four things:<br/>1. Linking addresses engaged in farming the same airdrop among themselves.<br/>2. Sending identical amounts simultaneously to multiple addresses from a centralized exchange (CEX).<br/>3. Conducting multiple airdrop farming using a single wallet.<br/>4. Executing an identical sequence of actions concurrently.<br/><br/>To guarantee your wallets are not identified as Sybil, our system employs a comprehensive randomization process for wallet actions. This means that even wallets within the same cluster will exhibit distinct timings, sequences, and sums, establishing a varied and unforeseeable approach. It is vital on your end to ensure that points 1, 2, and 3 are strictly avoided to prevent any issues.',
		},
		{
			id: uuidv4(),
			title: 'Can I run the bot for multiple wallet groups at the same time?',
			content:
				'Yes, absolutely. Our system allows you to establish a maximum of 1 or 10 wallet groups, each independently executing distinct strategies. These groups will seamlessly operate in parallel, ensuring efficient and effective script execution.',
		},
		{
			id: uuidv4(),
			title:
				'Is it possible to make the bot work specifically for my strategy, goals and needs?',
			content:
				'Currently, this feature is not available. However, we are diligently working towards introducing a Pro plan that will offer you the ability to automate tasks across multiple wallets and develop tailor-made solutions to address your specific needs. To explore this further, kindly initiate a ticket within our Discord channel to initiate a discussion about your unique requirements. If our team finds your case aligns with our criteria, we will be more than willing to collaborate closely with you. Your satisfaction and success are our top priorities.',
		},
		{
			id: uuidv4(),
			title: 'Does the bot make the interval between transactions?',
			content:
				'Absolutely, our bot implements a randomized time gap between each transaction, adding an extra layer of security and authenticity. Alternatively, if you prefer, you have the option to manually configure and set the transaction intervals according to your specific preferences. Your control and flexibility are paramount to us.',
		},
		{
			id: uuidv4(),
			title:
				'Can it happen that the bot will interrupt and not complete its work? What will happen to the money in the wallet?',
			content:
				'In the event of an error, our system provides transparent visibility into the specific wallet encountering the issue, empowering you to promptly address the situation by restarting the script. Rest assured, your funds will remain securely within your wallet throughout this process. Your peace of mind is our utmost priority.',
		},
		{
			id: uuidv4(),
			title: 'Do the bot have randomization among a group of accounts?',
			content:
				'Indeed, you have the authority to define the randomization ratio according to your preferences before initiating the script. Your control over this crucial aspect ensures a personalized and secure experience.',
		},
		{
			id: uuidv4(),
			title: 'Is there a minimum amount that must be in the wallet?',
			content:
				'Yes, the script outcomes are contingent upon the specific criteria and objectives you establish. To ensure the successful execution of the script, it is essential that the wallet balance remains equal to or exceeds the predetermined amount you configure during the script setup. This precautionary measure guarantees a seamless and reliable script performance aligned with your intentions.',
		},
		{
			id: uuidv4(),
			title: 'Is there a risk that the accounts will turn out to be sibyls?',
			content:
				'Rest assured, the risk of being identified as a Sybil entity is entirely mitigated. Here is a comprehensive explanation of why:<ul class="list-none"><li>1. Your wallets maintain complete independence and are not interlinked.</li><li>2. Our script operates with absolute randomness across various parameters, including timing, bridges, amounts, volumes, and networks.</li></ul> <br/>This meticulous randomness ensures your activities remain genuinely unpredictable and secure.',
		},
		{
			id: uuidv4(),
			title: 'Do I need to download something on my computer?',
			content:
				'Absolutely not, the Copilot Airdrop Farmer functions exclusively as a web application.',
		},
		{
			id: uuidv4(),
			title: 'Why is your software better than others?',
			content:
				'Unlike other software that uses a single script for all accounts with limited bridge options, our application offers robust customization and randomization. This means your chances of scoring rewarding drops are significantly boosted.',
		},
		{
			id: uuidv4(),
			title: 'Is the price of a monthly subscription fixed?',
			content:
				'No, the price will gradually rise each month as we update the product and introduce new Airdrops.',
		},
		{
			id: uuidv4(),
			title: 'Can I upgrade my plan?',
			content: 'Sorry, but plan upgrades are not available.',
		},
		{
			id: uuidv4(),
			title: 'Why can I trust you?',
			content:
				'Backed by strong technical expertise, we have previously collaborated with reputable DeFi projects like comb.financial and topia.fi. Our aim is to lead as the world premier airdrop automation software, driven by unwavering integrity – absolutely no room for scams.',
		},
		{
			id: uuidv4(),
			title: 'Will you support other airdrops later?',
			content: `Certainly! Should you wish to automate an airdrop not currently supported by us, please feel free to reach out to us on <a href="${discordLink}" target="_blank" rel="noreferrer" class="text-main-color cursor-pointer">Discord</a>. We're here to assist you.</p>`,
		},
		{
			id: uuidv4(),
			title: 'What Is a Crypto Airdrop?',
			content:
				'A crypto airdrop is a promotional tactic used by Web3 projects to introduce their new token. It entails giving away their native cryptocurrency at no cost to existing or potential users. While various types of airdrops exist, their core objective remains consistent: to boost awareness and generate heightened interest in the project.',
		},
		{
			id: uuidv4(),
			title: 'What Is LayerZero Airdrop?',
			content:
				'LayerZero is a versatile protocol that enhances how different chains communicate. It ensures reliable message delivery with adjustable levels of trust. <br/><br/> Although LayerZero does not currently have its own token, it has secured substantial funding, exceeding $280 million, from notable investors such as Alameda Research and Andreessen Horowitz. This makes it highly probable that they will introduce a token in the future. Users of LayerZero-based dApps might even receive an airdrop when this token launches.',
		},
		{
			id: uuidv4(),
			title: 'What Is zkSync Airdrop?',
			content:
				'zkSync operates as a ZK rollup – a secure method that leverages cryptographic proofs to offer efficient, cost-effective transactions on Ethereum. In zkSync, computations and much of the data occur off-chain. Since all transactions are verified on the Ethereum mainchain, the security level matches Ethereum. <br/><br/> With substantial funding amounting to $458 million from top investors including Blockchain Capital and Dragonfly Capital, zkSync is set to potentially introduce its own token. Exploring their mainnet could potentially qualify you for an airdrop once their token is launched.',
		},
		{
			id: uuidv4(),
			title: 'What Is StarkNet Airdrop?',
			content:
				'StarkNet is like a turbocharged engine for Ethereum – a decentralized Validity-Rollup (also known as a “ZK-Rollup”) that operates on its own. It acts as an extra boost for any dApp, allowing it to perform large-scale tasks without affecting Ethereum core speed and security. StarkNet secret weapon is its super-strong cryptographic proof system, known as STARK. <br/><br/> Exciting news: StarkNet is gearing up to introduce its very own token. They have set aside 9% of the total token supply for those who have helped build the StarkNet ecosystem – that developers and everyday users who have engaged with StarkNet dApps. Speaking of which, some popular StarkNet dApps include dydx, Immutable, Celer, DeversiFi, Argent, and more. If you have been part of the StarkNet journey by using these dApps before a certain snapshot date, you might just be in line for an airdrop.',
		},
		{
			id: uuidv4(),
			title: 'How do I increase the chances of getting a drop?',
			content:
				'<ul class="text-lg text-main-airdrop pr-6"><li>1. Account Warm-up: To avoid suspicion, consider making small transactions on different networks before joining the airdrop. It is best not to perform all transactions on the same day. Spreading them out over time and across various networks is advisable.</li><br><li>2. Diversify Transactions: Instead of making a high number of transactions in a single day, engage in occasional transactions over time across different networks, including the one offering the airdrop. Activity once a week or every few weeks over several months is recommended.</li><br><li>3. Transaction Volume: Whenever possible, aim to make multiple transactions, with each contributing to your activity. If significant spending is not feasible, aim for an account balance of $1,000 or more. This can enhance your chances of receiving the airdrop and the amount of tokens you are eligible for.</li><br><li>4. Join Project Activities: Participate in project votes using the Snapshot platform, if available. Additionally, engage in events hosted by the project to further increase your involvement.</li></ul>',
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
