import { Link} from "react-router-dom";
import { useParams } from "react-router-dom";

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
    const stand = getStand(id);

    return (
        <div className="standDescriptor">
            <Link to="/">Back</Link>
        {stand ? (
            <div>
                <h1>Stand Description - {id}</h1>
                <p>User: {stand.user}</p>
                <p>Personality: </p>
                <p>Name:</p>
                <p>Appereance: </p>
                <p>Stand Ability: </p>

                <h4>Stats </h4>
                <p>Power: </p>
                <p>Speed: </p>
                <p>Range: </p>
                <p>Durability: </p>
                <p>Precision: </p>
                <p>Potential: </p>
            </div>
        ) : (
            <div>
                <h4> Loading... </h4>ç
            </div>
        )}
        </div>
    );
}

export default StandDescription;

