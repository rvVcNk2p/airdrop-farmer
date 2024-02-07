import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@modules/shared/components/ui/accordion'
import parse from 'html-react-parser'

type DefaultAccordionType = {
	id: string
	title: string
	content: string
	collapsible?: boolean
}

const DefaultAccordion = ({
	id,
	title,
	content,
	collapsible = true,
}: DefaultAccordionType) => {
	return (
		<Accordion type="single" collapsible={collapsible} id={id}>
			<AccordionItem value={id} className="border-[#33323e]">
				<AccordionTrigger className="pr-6 text-left text-xl text-white !no-underline">
					{title}
				</AccordionTrigger>
				<AccordionContent className="text-main-airdrop pr-6 text-lg">
					{parse(content)}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export default DefaultAccordion
