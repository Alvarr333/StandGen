import{useState, useEffect} from 'react';

const API_URL = "http://localhost:3001";

function App() {
	const [standList, setStandList] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newStand, setNewStand] = useState("");

	useEffect(() => {
		GetStands();
		console.log("Stand list: ", standList);
	}, []);

	const GetStands = () => {
		fetch(API_URL + "/standgen")
			.then((res) => res.json())
			.then((data) => setStandList(data))
			.catch((err) => console.log("Error: ", err));
	};

	const deleteStand = async(id) => {
		const data = await fetch(API_URL + "/standgen/delete/" + id, {
			method: "DELETE",
		}).then((res) => res.json());

		setStandList(standList.filter((stand) => stand._id !== id));
	};

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
			<div className="standList">
				{standList.map((stand) => (
				<ul className="standSummary">
				<li className="standName">{stand.name}</li>
				<li>User: {stand.user}</li>
				<li>Personality: {stand.personality}</li>
				<li>Stand appereance: {stand.appereance}</li>
				<li>Stand ability: {stand.standAbility}</li>
				<span className="deleteStand">x</span>
			</ul>
				))}
			</div>
		</div>
	);
}

export default App;
