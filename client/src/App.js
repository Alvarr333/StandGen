function App() {
	return (
		<div className="App">
			<h1>Stand Generator v1.0</h1>	
			<div class="search-bar-container">
  			<div class="search-bar">
    			<img src="lupa.png" alt="Search" class="search-bar-logo"></img>
    			<input type="text" placeholder="Search..." class="search-input"></input>
  			</div>
  			<button class="search-button">
    			<img src="lupa.png" alt="Generate Stand" class="search-button-logo"></img>
					<span class="search-button-text">Generate Stand</span>
				</button>
			</div>
			
			<h4>Stand list</h4>
			<div className="stand-list">
				<ul className="standSummary">
				  <li className="standName">StandName1</li>
					<li>User1</li>
					<li>Personality1</li>
					<li>Appereance1</li>
					<li>Stand ability1</li>
				</ul>
				<ul className="standSummary">
			    <li className="standName">StandName2</li>
					<li>User2</li>
					<li>Personality2</li>
					<li>Appereance2</li>
					<li>Stand ability2</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
