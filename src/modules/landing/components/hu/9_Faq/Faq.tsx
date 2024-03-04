import DefaultAccordion from '@modules/shared/components/atoms/DefaultAccordion'
import { v4 as uuidv4 } from 'uuid'

const Faq = () => {
	const faqs = [
		{
			id: uuidv4(),
			title:
				'Milyen tárcával vagy tácákkal érdemes belevágni az Airdrop vadászatba?',
			content:
				'A termék használatához javasolt olyan tárcákat alkalmazni, amelyeken semmiképpen sem tárolsz komoly összegeket. Érdemes olyan tárcákat létrehoznod, amelyet kimondottan csak Airdrop farmolásra használsz. Magyarul, nem a portfóliód tárolására alkalmazod. ',
		},
		{
			id: uuidv4(),
			title: 'Mi történik akkor, ha leesik egy airdrop a tárcáimra?',
			content:
				'Érdemes ilyenkor ezeket a kripto jutalmakat (airdropokat) kiutalni egy olyan tárcára, amelyet tárolásra alkalmazol. A javasolt eljárás egy sikeres Airdrop jutalom jogolsultsága során, hogy ezeket vagy realizálod (amennyiben akarod) vagy kiutalod egy olyan kriptotárcára, amin ezeket biztonságosan tárolni tudod.',
		},
		{
			id: uuidv4(),
			title: 'Ki tárolja a Privát kulcsom?',
			content: `Termékünk egy egyedi automatiizált airdop gazdálkodásra szóló software, ami maximális biztonságot nyújt privát kulcsaid számára. 
Mi nem tároljuk őket, így biztonságban maradnak, mert a Te saját böngésződ tárolja ezeket. Softwareünk a tranzakciókat zökkenőmentesen aláírja a háttérben, mert a böngésződdel kommunikál. 
</br></br>
Fontos számunkra az őszinteség és a feddhetetlenség illetve az ügyfeleink belénk fektetett bizalmának megörzése.  
Célunk, hogy egy kiváló terméket hozzunk létre, amely kényelmet és hatékonyságot biztosít a felhasználóink számára. `,
		},
		{
			id: 'can-i-become-sybil',
			title: 'Mit jelent az, hogy Sybil és hogyan kerülhetem ki ezt?',
			content: `
			Sybil-fiókként való azonosítás azt jelenti, hogy egy algoritmus felismerte, hogy több tárcacímet üzemeltetsz kizárólag airdrop farmon való részvétel céljából. </br></br>

Ahhoz, hogy Sybilként azonosítsanak, négy dolgnak kell történnie:
1. A tárcákk, amikről farmolsz összekapcsolhatók egymással. </br>
2. Azonos összegek egyidejű küldése több címre egy centralizált tőzsdéről (CEX). </br>
3. Több airdrop farmon való részvétel egyetlen tárcával. </br>
4. Azonos cselekvéssorozatok egyidejű végrehajtása. </br></br>

Annak érdekében, hogy a tárcáidat ne azonosítsák Sybilként, a rendszerünk egy átfogó véletlenszerűsítési folyamatot alkalmaz a tárca műveletekhez. 
Ez azt jelenti, hogy még azonos csoportban lévő tárcák is eltérő időzítéseket, sorrendeket és összegeket fognak mutatni, így egy változatos és kiszámíthatatlan megközelítést biztosítva. 
A Te feladatod mint felhasználó az, hogy az 1, 2 és 3 pontokban foglaltakat elkerüld.
			`,
		},
		{
			id: uuidv4(),
			title: 'Futtathatok egyidejűleg akár több stratégiát is?',
			content:
				'Igen, természetesen. Rendszerünk lehetővé teszi, hogy több stratégiát hozz létre. Mindegyik önállóan különböző stratégiákat hajt végre. Ezek a stratégiák zökkenőmentesen működnek párhuzamosan, biztosítva a hatékony és eredményes script végrehajtását.',
		},
		{
			id: uuidv4(),
			title: 'Tart a termék szüneteket a tranzakciók között?',
			content:
				'Teljes mértékben, a botunk véletlenszerű időközöket alkalmaz minden tranzakció között, ezzel is növelve a biztonságot és hitelességet. Alternatívaként, ha szeretné, lehetőséged van manuálisan is beállítani és konfigurálni a tranzakciók intervallumait a saját preferenciái szerint.',
		},
		{
			id: uuidv4(),
			title:
				'Történhet olyan, hogy a robot váratlanul félbeszakítja a műveletet és leáll? ',
			content:
				'Ha igen akkor mi történik a tárcán lévő kriptopénzekkel? Amennyiben hiba lép fel, rendszerünk átláthatóan megjeleníti az érintett pénztárca adatait, lehetővé téve számodra, hogy gyorsan reagálhass a kialakult helyzetre a szkript újraindításával. Egy ilyen esetben sincs semmi ok az aggodalomra, a kriptopénzek eszközei végig biztonságban maradnak a pénztárcában a folyamat során.',
		},
		{
			id: uuidv4(),
			title: 'Alkalmaz a Robot randomizációt a stratégiák és tárcák között?',
			content:
				'Ennél a softwarenél a felhasználó kezében van a hatalom, hogy  a szkript elindítása előtt meghatározza a véletlenszerűsítés arányát a saját preferenciái szerint.',
		},
		{
			id: uuidv4(),
			title:
				'Mi az a minimális összeg, amelyet a tácámra kell helyezzek a farmolás kezdete előtt?',
			content:
				'A szkript sikeres végrehajtásának biztosítása érdekében elengedhetetlen, hogy a pénztárca egyenlege legalább egyenlő legyen vagy meghaladja a szkript beállítása során konfigurált előre meghatározott összeget. Ez garantálja a zökkenőmentes és megbízható szkriptteljesítményt, amely összhangban van a a kalkulált díjakkal és tranzakciós költségekkel.',
		},
		{
			id: uuidv4(),
			title:
				'Le kell töltenem valamit a számítógépemre, hogy ezt a szoftver alkalmazzam?',
			content:
				'Semmiképpen sem, a Copilot Airdrop Farmer kizárólag webalkalmazásként működik.',
		},
		{
			id: uuidv4(),
			title:
				'Miért jobb ez a szoftver más Airdrop vadász szoftverekkel szemben?',
			content:
				'Szemben más szoftverekkel, amelyek minden fiókhoz egyetlen szkriptet használnak korlátozott hidalási opciókkal, a mi alkalmazásunk egyedi testreszabási és randomizálási lehetőségeket kínál. Ez azt jelenti, hogy jóval nagyobb esélyed van értékes Airdropok megszerzésére.',
		},
		{
			id: uuidv4(),
			title: 'Más Airdopok vadászatát is fogja támogatni ez a termék?',
			content:
				'Teljes mértékben. DeFi Hungary folyamatosan kutatja és keresi azokat az Airdrop lehetőségeket, amelyekre ezt a szoftvert is konfigurálja. Legyen az Ethereum vagy Ethereummal kompatibilis láncok vagy akár nem EVM kompatibilis láncok. Csapatunk folyamatosan törekedk arra, hogy minden aktuális és relevánas Airdropot implementálja a termékbe.',
		},
		{
			id: uuidv4(),
			title: 'Mi az a kripto Airdrop?',
			content:
				'Egy kriptovaluta airdrop egy promóciós taktika, amelyet a Web3 projektek használnak új tokenjük bemutatására. Ez azt jelenti, hogy saját natív kriptovalutájukat ingyen adják oda korai-vagy meglévő illetve potenciális felhasználóinak. Bár az airdropoknak különböző típusai léteznek, alapvető céljuk ugyan az marad: növelni a tudatosságot és fokozni az érdeklődést a projekt iránt.',
		},

		{
			id: uuidv4(),
			title:
				'Hogyan növelhetem annak az esélyét, hogy egy Airdopban részesüljek?',
			content:
				'1. Fiók Bemelegítése más hálózatokon: A Sybil gyanú elkerülése érdekében fontos, hogy a tárca már más hálózatokon is aktív volt mielőtt az airdrop farmolásnak kezdesz. Itt az s legjobb, ha a tranzakciókat nem ugyanazon a napon hajtod végre. Javasolt a tranzakciókat időben és különböző hálózatokon elosztani. </br></br> 2. Tranzakciók Diverzifikálása: Ahelyett, hogy egyetlen napon nagy számú tranzakciót hajtanál végre, inkább különböző alkalmakkor próbálkozz. Ajánlott a tevékenységeket hetente egyszer vagy néhány hétenként több hónapon át végrehajtani. </br></br> 3. Tranzakciók Volumene: Amennyiben lehetséges, törekedj arra, hogy több tranzakciót hajts végre. Minél nagyobb a volumen, amit lebonyolítasz annál jobb. </br></br> 4. Csatlakozás a Projekt Tevékenységeihez: Vegyél részt a projekt szavazásaiban (amennyiben van ilyen). Továbbá, vegyél részt a projekt által rendezett eseményeken.',
		},
	]

	return (
		<section className="px-8 py-16 md:py-36" id="faq">
			<div className="mx-auto max-w-6xl">
				<div className="mb-8 md:mb-20">
					<h1 className="mb-4 text-center text-3xl font-semibold uppercase text-white md:mb-6 md:text-5xl">
						Gyakran Ismételt Kérdések
					</h1>
					<p className="text-main-airdrop text-center text-xl md:text-2xl">
						Ha még maradtak volna kérdéseid
					</p>
				</div>
				<div className="mx-auto max-w-3xl">
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
