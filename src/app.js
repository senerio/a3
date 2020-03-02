let data = null;

function App({stats, save}) {
	const [isLoaded, setLoaded] = React.useState(null);
	const [selectedCards, setSelectedCards] = React.useState({});
	const [selectedStats, setSelectedStats] = React.useState({});
	const [filters, setFilters] = React.useState({
		Rarity: ['SSR'],
		Attribute: ['All'],
		Spring: ['All'],
		Summer: ['All'],
		Autumn: ['All'],
		Winter: ['All'],
		Other: [],
		Selected: ['All'],
		Troupe: ['All']
	});

	function toggleFilter(key, value, arrayLength) {
		let temp = filters[key];
		if(!filters[key].includes(value)) {
			// Single choice only
			if(key == 'Selected') {
				temp = []
			}
			// Remove everything else except 'All' if All is selected
			if(value == 'All') {
				setFilters({...filters, [key]:['All']})
			} else {
				// Deselect 'All' if something else is selected
				if(filters[key].includes('All')) {
					temp.splice(filters[key].indexOf('All'), 1);
				}
				// Select key
				temp.push(value);
				setFilters({...filters, [key]:temp});
			}
			if(filters[key].length == arrayLength) {
				setFilters({...filters, [key]:['All']})
			}
		} else {
			if(value != 'All') {
				// Deselect Key if already Selected
				temp.splice(filters[key].indexOf(value), 1);
				setFilters({...filters, [key]:temp})
			}
			if(filters[key].length == 0) {
				setFilters({...filters, [key]:['All']})
			}
		}
	}
	
	const filteredCards = data ?
		data.cards.filter(card => {
			let chara = card.chara.split(' ')[0];
			return(
				(filters.Rarity.includes(card.rarity) ? true : filters.Rarity[0] == 'All') &&
				(filters.Attribute.includes(card.attribute) ? true : filters.Attribute[0] == 'All') &&
				(filters.Troupe.includes(card.troupe) ? true : filters.Troupe[0] == 'All') &&
				(filters[card.troupe].includes(chara) ? true : filters[card.troupe] == 'All') &&
				(filters.Selected[0] == 'All' ? true : ( filters.Selected[0] == 'Selected' ? !!selectedCards[card.number] : !selectedCards[card.number] ) )
			);
		}).map(card => card.number) : [];

	function toggleSelected(id) {
		if(!selectedCards[id]) {
			setSelectedCards({...selectedCards, [id]: {bloom:0, train:0}});
			setSelectedStats({...selectedStats,
				[id]: computeCardStats(id, 0, 0)
			});
		} else {
			let selectedCopy = Object.assign({}, selectedCards);
			let selectedStatsCopy = Object.assign({}, selectedStats);
			delete selectedCopy[id];
			delete selectedStatsCopy[id];
			setSelectedCards(selectedCopy);
			setSelectedStats(selectedStatsCopy);
		}
	}

	function toggleUpgrades(id, upgrade, level) {
		if(level == selectedCards[id][upgrade]) { // if user clicks current level, reset it
			var upgrades = {...selectedCards[id], [upgrade]: 0}
		}
		else {
			var upgrades = {...selectedCards[id], [upgrade]: level};
		}
		setSelectedCards({...selectedCards,
			[id]: upgrades
		});
		setSelectedStats({...selectedStats,
			[id]: computeCardStats(id, upgrades.bloom, upgrades.train)
		});
	}

	function loadSaveData() {
		let saveData = JSON.parse(document.getElementById("load_save_data").value);
		let saveDataStats = {};
		for(let id in saveData) {
			saveDataStats[id] = computeCardStats(
				id,
				saveData[id].bloom,
				saveData[id].train
			);
		}
		setSelectedCards(saveData);
		setSelectedStats(saveDataStats);
	}

	function loadGameData(filename, callback) {
		return new Promise(function (resolve, reject) {
			let xhr = new XMLHttpRequest();
			xhr.open('GET', 'data/'+filename+'.json', true);
			xhr.responseType = 'json';
			xhr.onload = () => { resolve(xhr.response) };
			xhr.send();
		})
	}

	function init() {
		Promise.all([
			loadGameData('cards'),
			loadGameData('card_stats'),
			loadGameData('stat_patterns'),
			loadGameData('team_skills')
		]).then(values => {
			data = {
				cards: values[0],
				card_stats: values[1],
				stat_patterns: values[2],
				team_skills: values[3]
			};
			setLoaded(true);
		});
		return renderLoading;
	}
	
	const renderLoading = (
		<div id="loading">
			<span>Now Loading... </span>
			<span className="spin">✿</span>
		</div>
	)

	const renderLoaded = (
		<div>
			{save ? <SaveData
				cards={selectedCards}
				loadOnClick={loadSaveData}
			/> : null}
			<Filter
				filter={filters}
				toggleFilter={toggleFilter}
			/>
			{stats ? <Stats
				cards={selectedStats}
			/> : null}
			<CardList
				filteredCards={filteredCards}
				selectedCards={selectedCards}
				toggleSelected={toggleSelected}
				toggleUpgrades={toggleUpgrades}
			/>
		</div>
	)

	return !isLoaded ? init() : renderLoaded;
}