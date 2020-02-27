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

const Card = ({id, attribute, lockVisibility, toggleSelected, toggleUpgrades, levels}) => {
	return(
		<div className="card">
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

function CardList({displayed, selectedCards, toggleSelected, toggleUpgrades}) {
	return(
		<div id="card_list">
			{
				displayed.map((card, key) => (
					<Card
						id={card.id}
						attribute={card.attribute}
						lockVisibility={!!selectedCards[card.id] ? "on" : ""}
						toggleSelected={toggleSelected}
						toggleUpgrades={toggleUpgrades}
						levels={selectedCards[card.id]}
						key={key}
					/>
				))
			}
		</div>
	);
}