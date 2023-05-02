import{useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import StandDescription from './StandDescription';

const API_URL = "http://localhost:3001";

function App() {
	const [standList, setStandList] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newStand, setNewStand] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		GetStands();
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
			await fetch(API_URL + "/standgen/delete/" + id, {
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
				name: newStand.name,
				appereance: newStand.appereance,
				standAbility: newStand.standAbility,
				power: newStand.power,
				speed: newStand.speed,
				range: newStand.range,
				durability: newStand.durability,
				precision: newStand.precision,
				potential: newStand.potential,
			}),
		}).then((res) => res.json());

		setStandList([...standList, data]);
		setPopupActive(false);
		setNewStand("");
	}

	const handleSearchInput = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	}

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<div className="App">
						<h1>Stand Generator v2.1</h1>	
						<div className="search-bar-container">
						<div className="search-bar">
							<img src="lupa.png" alt="Search" className="search-bar-logo"></img>
							<input type="text" placeholder="Search..." className="search-input" onChange={handleSearchInput}></input>
						</div>
						<button className="button" onClick={() => 
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
											className="createStand"
											onChange={e => setNewStand({...newStand, user: e.target.value})}>
										</input>
										<input 
											type="text" 
											placeholder="Personality" 
											className="createStand"
											onChange={e => setNewStand({...newStand, personality: e.target.value})}>
										</input>
										<input 
											type="text" 
											placeholder="Stand Name" 
											className="createStand"
											onChange={e => setNewStand({...newStand, name: e.target.value})}>
										</input>
										<input 
											type="text" 
											placeholder="Appereance" 
											className="createStand"
											onChange={e => setNewStand({...newStand, appereance: e.target.value})}>
										</input>
										<input 
											type="text" 
											placeholder="Stand Ability" 
											className="createStand"
											onChange={e => setNewStand({...newStand, standAbility: e.target.value})}>
										</input>
										<input type='text' 
											placeholder='Power (1-5)' 
											className='createStand' 
											onChange={e => setNewStand({...newStand, power: e.target.value})}>
										</input>
										<input type='text'
											placeholder='Speed (1-5)'
											className='createStand'
											onChange={e => setNewStand({...newStand, speed: e.target.value})}>
										</input>
										<input type='text'
											placeholder='Range (1-5)'
											className='createStand'
											onChange={e => setNewStand({...newStand, range: e.target.value})}>
										</input>
										<input type='text'
											placeholder='Durability (1-5)'
											className='createStand'
											onChange={e => setNewStand({...newStand, durability: e.target.value})}>
										</input>
										<input type='text'
											placeholder='Precision (1-5)'
											className='createStand'
											onChange={e => setNewStand({...newStand, precision: e.target.value})}>
										</input>
										<input type='text'
											placeholder='Potential (1-5)'
											className='createStand'
											onChange={e => setNewStand({...newStand, potential: e.target.value})}>
										</input>
										<div className="buttonCreate" onClick={createStand}>Create!</div>
									</div>
								</div>
							) : null}

							<img src="/client/src/lupa.png" alt="Generate Stand" className="search-button-logo"></img>
								<span className="search-button-text"></span>
							</button>
						</div>
						
						<h4>Stand list</h4>
						<div className="standList">
							{standList.filter(stand => stand.name.toLowerCase().indexOf(searchTerm) > -1)
							.map((stand) => (
							<div className="standSummary" key={stand._id}>
								<Link to={`/stand/${stand._id}`}>
									<li className="standName">{stand.name}</li>
									<li>User: {stand.user}</li>
									<li>Personality: {stand.personality}</li>
									<li>Stand appereance: {stand.appereance}</li>
									<li>Stand ability: {stand.standAbility}</li>
								</Link>
								
								<div className="deleteStand" onClick={() => 
									deleteStand(stand._id)
									}>x</div>
							</div>
							))}
						</div>
					</div>
				</Route>

				<Route path="/stand/:id">
					<StandDescription />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
