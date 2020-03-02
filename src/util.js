function rarityModifier(rarity) {
	switch(rarity) {
		case "N": return 1;
		case "R": return 2;
		case "SR": return 3;
		case "SSR": return 4;
	}
}

function computeCardStats(no, bloom, train) {

	let { initial, secondaryatt:attribute2 } = data.card_stats.find(e => e.number == no),
		s = data.stat_patterns.find(e => e.ID == initial),
		{ attribute:attribute1, rarity, chara } =  data.cards.find(e => e.number == no),
		attribute3 = ["Comedy", "Action", "Drama"].filter(e => ![attribute1, attribute2].includes(e))
	
	chara = chara.split(" ")[0]
	let level = rarityModifier(rarity)*20 + bloom*10,
		trainingBonus = rarityModifier(rarity)*100 * train

	return {
		[attribute1] : s.att1 + s.inc1*(level-1) + trainingBonus,
		[attribute2] : s.att2 + s.inc2*(level-1) + trainingBonus,
		[attribute3] : s.att3 + s.inc3*(level-1) + trainingBonus,
		rarity: rarity,
		attribute: attribute1,
		chara: chara,
		id: no
	}
}

function abbreviate(text) {
	switch(text) {
		case "Comedy": return "Co";
		case "Action": return "Ac";
		case "Drama": return "Dr";
	}
}