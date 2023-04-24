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
		const confirmed = window.confirm("Are you sure you want to delete this stand?");
		if (confirmed) {
			const data = await fetch(API_URL + "/standgen/delete/" + id, {
				method: "DELETE",
			}).then((res) => res.json());

			setStandList(standList.filter((stand) => stand._id !== id));
		}
	};

	const createStand = async() => {
		const data = await fetch(API_URL + "/standgen/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: newStand.user,
				personality: newStand.personality,
				stand: newStand.stand,
				appereance: newStand.appereance,
				standAbility: newStand.standAbility,
			}),
		}).then((res) => res.json());

		setStandList([...standList, data]);
		setPopupActive(false);
		setNewStand("");
	}

	return (
		<div className="App">
			<h1>Stand Generator v1.0</h1>	
			<div class="search-bar-container">
  			<div class="search-bar">
    			<img src="lupa.png" alt="Search" class="search-bar-logo"></img>
    			<input type="text" placeholder="Search..." class="search-input"></input>
  			</div>
  			<button class="button" onClick={() => 
				setPopupActive(true)}>

				{popupActive ? (
					<div className="popup">
						<div className="closePopup" onClick={(event) => {
    						event.stopPropagation();
    						setPopupActive(false);
						}}>x</div>
						<div className="popupContent">
							<h3>Generate Stand</h3>
							<input 
								type="text" 
								placeholder="User" 
								class="createStand"
								onChange={e => setNewStand({...newStand, user: e.target.value})}>
							</input>
							<input 
								type="text" 
								placeholder="Personality" 
								class="createStand"
								onChange={e => setNewStand({...newStand, personality: e.target.value})}>
							</input>
							<input 
								type="text" 
								placeholder="Stand" 
								class="createStand"
								onChange={e => setNewStand({...newStand, stand: e.target.value})}>
							</input>
							<input 
								type="text" 
								placeholder="Appereance" 
								class="createStand"
								onChange={e => setNewStand({...newStand, appereance: e.target.value})}>
							</input>
							<input 
								type="text" 
								placeholder="Stand Ability" 
								class="createStand"
								onChange={e => setNewStand({...newStand, standAbility: e.target.value})}>
							</input>
							<div className="buttonCreate" onClick={createStand}>Create!</div>
						</div>
					</div>
				) : null}

    			<img src="/client/src/lupa.png" alt="Generate Stand" class="search-button-logo"></img>
					<span class="search-button-text"></span>
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
				<div className="deleteStand" onClick={() => 
					deleteStand(stand._id)
					}>x</div>
			</ul>
				))}
			</div>
		</div>
	);
}

export default App;
