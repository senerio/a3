function Stats({cards}) {
	return Object.keys(cards).length != 0 ?
		<div id="stats">
			{
				Object.keys(cards).map((id, key) => (
					<div className="card_stats" key={key}>
						<img src={`img/card/${id}.png`} className="icon" />
							<br /><img src="img/Co.png" /> {cards[id].Comedy}
							<br /><img src="img/Ac.png" /> {cards[id].Action}
							<br /><img src="img/Dr.png" /> {cards[id].Drama}
							<br />= {cards[id].Comedy+cards[id].Action+cards[id].Drama}
					</div>
				))
			}
		</div>
	: null;
}