import { Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RadarChart from "./RadarChart";

const API_URL = "http://localhost:3001";

const StandDescription = () => {

    const [standList, setStandList] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newStand, setNewStand] = useState("");

    const { id } = useParams();
    const [stand, setStand] = useState(null);

    useEffect(() => {
        getStand(id).then(data => setStand(data));
    }, [id]);

    const changeStats = async (id) => {
        const data = await fetch(API_URL + `/standgen/update/stats/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            power: newStand.power,
            speed: newStand.speed,
            range: newStand.range,
            durability: newStand.durability,
            precision: newStand.precision,
            potential: newStand.potential,
          }),
        }).then((res) => res.json());
      
        setStand({
          ...stand,
          power: data.power,
          speed: data.speed,
          range: data.range,
          durability: data.durability,
          precision: data.precision,
          potential: data.potential,
        });
        setPopupActive(false);
        setNewStand("");
      };
      

    const getStand = async (id) => {
    const data = await fetch(API_URL + `/standgen/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());

    // handle the response data as needed
    console.log(data);
    return data;
};

    return (
        <div className="standDescriptor">
            <Link to="/">Back</Link>
        {stand ? (
            <div>
                <h1>Stand Description</h1>
                <h4>User: </h4> <p>{stand.user}</p>
                <h4>Personality: </h4> <p>{stand.personality}</p>
                <h4>Name: </h4><p>{stand.name}</p>
                <h4>Appereance: </h4><p>{stand.appereance}</p>
                <h4>Stand Ability: </h4><p>{stand.standAbility}</p>

                <h4>Stats </h4>
                <button className="button" onClick={() => 
							setPopupActive(true)}>

							{popupActive ? (
								<div className="popup">
									<div className="closePopup" onClick={(event) => {
										event.stopPropagation();
										setPopupActive(false);
									}}>x</div>
									<div className="popupContent">
										<h3>Change Stand Stats</h3>
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
                                        <div className="buttonCreate" onClick={() => changeStats(id)}>Update</div>
									</div>
								</div>
							) : null}
                            </button>

                {/* <p>Power: {stand.power}</p>
                <p>Speed: {stand.speed}</p>
                <p>Range: {stand.range}</p>
                <p>Durability: {stand.durability}</p>
                <p>Precision: {stand.precision}</p>
                <p>Potential: {stand.potential}</p> */}

                <div> 
                    <RadarChart stand={stand} />
                </div>
            </div>
        ) : (
            <div>
                <h4> Loading... </h4>
            </div>
        )}
        </div>
    );
}

export default StandDescription;
