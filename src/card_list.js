const Ribbon = ({text}) => {
	return(
		<div className="ribbon">
			<div>{text}</div>
		</div>
	)
}

const Bloom = ({level, toggleLevel}) => {
	return(
		<div className={"bloom b" + level}>
			<span onClick={() => toggleLevel(2)}>✿</span>
			<span onClick={() => toggleLevel(1)}>✿</span>
		</div>
	)
}

const Training = ({level, toggleLevel}) => {
	return(
		<div className={"training t" + level}>
			<span onClick={() => toggleLevel(3)}>▲</span>
			<span onClick={() => toggleLevel(2)}>▲</span>
			<span onClick={() => toggleLevel(1)}>▲</span>
		</div>
	)
}

const CardInfo = ({levels, toggleUpgrades}) => {
	return levels ?
	<div className="card_info">
		<Bloom
			level={levels.bloom}
			toggleLevel={(level) => toggleUpgrades('bloom', level)}
		/>
		<Training
			level={levels.train}
			toggleLevel={(level) => toggleUpgrades('train', level)}
		/>
	</div>
	: null; 
}

const Card = ({id, attribute, cardVisibility, lockVisibility, toggleSelected, toggleUpgrades, levels}) => {
	return(
		<div
			className={`card ${cardVisibility}`}
		>
			<div className="card_icon">
				<img
					src={`img/card/${id}.png`}
					className="icon"
					alt={id}
					onClick={() => toggleSelected(id)}
				/>
				<img
					src={`img/${attribute}.png`}
					className="card_attribute"
				/>
				<img
					src="img/lock.png"
					className={`lock ${lockVisibility}`}
				/>
			</div>
			<CardInfo
				levels={levels}
				toggleUpgrades={(upgrade, level) => toggleUpgrades(id, upgrade, level)}
			/>
		</div>
	);
}

function CardList({filteredCards, selectedCards, toggleSelected, toggleUpgrades}) {
	return(
		<div id="card_list">
			{
				data.cards.map((card, key) => (
					<Card
						id={card.number}
						attribute={abbreviate(card.attribute)}
						cardVisibility={filteredCards.includes(card.number) ? "" : "hide"}
						lockVisibility={!!selectedCards[card.number] ? "on" : ""}
						toggleSelected={toggleSelected}
						toggleUpgrades={toggleUpgrades}
						levels={selectedCards[card.number]}
						key={key}
					/>
				))
			}
		</div>
	);
}