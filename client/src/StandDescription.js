import { Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RadarChart from "./RadarChart";

const API_URL = "http://localhost:3001";

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

const StandDescription = () => {

    const { id } = useParams();
    const [stand, setStand] = useState(null);

    useEffect(() => {
        getStand(id).then(data => setStand(data));
    }, [id]);

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
