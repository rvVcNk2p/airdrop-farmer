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
				<AccordionTrigger className="text-xl text-left text-white pr-6 !no-underline">
					{title}
				</AccordionTrigger>
				<AccordionContent className="text-lg text-main-airdrop pr-6">
					{parse(content)}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export default DefaultAccordion
