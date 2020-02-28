let filterOptions = {
	'rarity': ['N', 'R', 'SR', 'SSR', 'All'],
	'attribute': ['Comedy', 'Action', 'Drama', 'All'],
	'troupe': ['Spring', 'Summer', 'Autumn', 'Winter','All'],
	'spring': ['Sakuya', 'Masumi', 'Tsuzuru', 'Itaru', 'Citron', 'Chikage', 'All'],
	'summer': ['Tenma', 'Yuki', 'Muku', 'Misumi', 'Kazunari', 'Kumon', 'All'],
	'autumn': ['Banri', 'Juza', 'Taichi', 'Omi', 'Sakyo', 'Azami', 'All'],
	'winter': ['Tsumugi', 'Tasuku', 'Homare', 'Hisoka', 'Azuma', 'Guy', 'All'],
	'selected': ['Selected','Not selected','All']
}

const FilterSet = ({filters, selected, toggleFilter, isNotVisible, background}) => {
	return(
		isNotVisible ? null
		: 
		<div className="set" style={{backgroundColor: background}}>
			{
				filters.map((value, i) => {
					return(
						<button
							className={selected.includes(value) ? "selected" : null}
							onClick={() => toggleFilter(value)}
							value={value}
							key={i}
						>
							{value}
						</button>
					)
				})
			}
		</div>
	);
}

function Filter({filter, toggleFilter}) {
	return(
		<div id="filter">
			<div className="group">
				<div className="header">Rarity</div>
				<FilterSet
					filters={filterOptions.rarity}
					selected={filter.Rarity}
					toggleFilter={(value) => toggleFilter('Rarity', value, filterOptions.rarity.length-1)}
				/>
			</div>
			<div className="group">
				<div className="header">Attribute</div>
				<FilterSet
					filters={filterOptions.attribute}
					selected={filter.Attribute}
					toggleFilter={(value) => toggleFilter('Attribute', value, filterOptions.attribute.length-1)}
				/>
			</div>
			<div className="group">
				<div className="header">Troupe/Member</div>
				<FilterSet
					filters={filterOptions.troupe}
					selected={filter.Troupe}
					toggleFilter={(value) => toggleFilter('Troupe', value, filterOptions.troupe.length-1)}
				/>
				<FilterSet
					filters={filterOptions.spring}
					selected={filter.Spring}
					isNotVisible={filter.Troupe[0] != 'All' && !filter.Troupe.includes('Spring')}
					background='#FF98C0'
					toggleFilter={(value) => toggleFilter('Spring', value, filterOptions.spring.length-1)}
				/>
				<FilterSet
					filters={filterOptions.summer}
					selected={filter.Summer}
					isNotVisible={filter.Troupe[0] != 'All' && !filter.Troupe.includes('Summer')}
					background='#FFE060'
					toggleFilter={(value) => toggleFilter('Summer', value, filterOptions.summer.length-1)}
				/>
				<FilterSet
					filters={filterOptions.autumn}
					selected={filter.Autumn}
					isNotVisible={filter.Troupe[0] != 'All' && !filter.Troupe.includes('Autumn')}
					background='#FFA870'
					toggleFilter={(value) => toggleFilter('Autumn', value, filterOptions.autumn.length-1)}
				/>
				<FilterSet
					filters={filterOptions.winter}
					selected={filter.Winter}
					isNotVisible={filter.Troupe[0] != 'All' && !filter.Troupe.includes('Winter')}
					background='#88D0FF'
					toggleFilter={(value) => toggleFilter('Winter', value, filterOptions.winter.length-1)}
				/>
			</div>
			<div className="group">
				<div className="header">Selected</div>
				<FilterSet
					filters={filterOptions.selected}
					selected={filter.Selected}
					toggleFilter={(value) => toggleFilter('Selected', value, filterOptions.selected.length-1)}
				/>
			</div>
		</div>
	);
}