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
					filters={['N', 'R', 'SR', 'SSR', 'All']}
					selected={filter.Rarity}
					toggleFilter={(value) => toggleFilter('Rarity', value)}
				/>
			</div>
			<div className="group">
				<div className="header">Attribute</div>
				<FilterSet
					filters={['Comedy', 'Action', 'Drama', 'All']}
					selected={filter.Attribute}
					toggleFilter={(value) => toggleFilter('Attribute', value)}
				/>
			</div>
			<div className="group">
				<div className="header">Troupe/Member</div>
				<FilterSet
					filters={['Spring', 'Summer', 'Autumn', 'Winter', 'Others','All']}
					selected={filter.Troupe}
					toggleFilter={(value) => toggleFilter('Troupe', value)}
				/>
				<FilterSet
					filters={['Sakuya', 'Masumi', 'Tsuzuru', 'Itaru', 'Citron', 'All']}
					selected={filter.Spring}
					isNotVisible={filter.Troupe[0] != 'All' && !filter.Troupe.includes('Spring')}
					background='#FF98C0'
					toggleFilter={(value) => toggleFilter('Spring', value)}
				/>
				<FilterSet
					filters={['Tenma', 'Yuki', 'Muku', 'Misumi', 'Kazunari', 'All']}
					selected={filter.Summer}
					isNotVisible={filter.Troupe[0] != 'All' && !filter.Troupe.includes('Summer')}
					background='#FFE060'
					toggleFilter={(value) => toggleFilter('Summer', value)}
				/>
				<FilterSet
					filters={['Banri', 'Juza', 'Taichi', 'Omi', 'Sakyo', 'All']}
					selected={filter.Autumn}
					isNotVisible={filter.Troupe[0] != 'All' && !filter.Troupe.includes('Autumn')}
					background='#FFA870'
					toggleFilter={(value) => toggleFilter('Autumn', value)}
				/>
				<FilterSet
					filters={['Tsumugi', 'Tasuku', 'Homare', 'Hisoka', 'Azuma', 'All']}
					selected={filter.Winter}
					isNotVisible={filter.Troupe[0] != 'All' && !filter.Troupe.includes('Winter')}
					background='#88D0FF'
					toggleFilter={(value) => toggleFilter('Winter', value)}
				/>
			</div>
			<div className="group">
				<div className="header">Selected</div>
				<FilterSet
					filters={['Selected','Not selected','All']}
					selected={filter.Selected}
					toggleFilter={(value) => toggleFilter('Selected', value)}
				/>
			</div>
		</div>
	);
}