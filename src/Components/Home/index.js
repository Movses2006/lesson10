import { useState, useEffect } from "react";
import "./style.css"
import { dataAPI } from "./data";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("cat");
    const [images, setImages] = useState([]);
    const [noResults, setNoResults] = useState(false);

    const API = `${dataAPI}/${searchTerm}`;

    const [backgroundColor, setBackgroundColor] = useState("white");

    const changeBackgroundColor = () => {
        setBackgroundColor(backgroundColor === "white" ? "#333" : "white");
    };

    const fetchData = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
    
            if (data.results.length === 0) {
                setNoResults(true);
            } else {
                setImages(data.results);
                setNoResults(false);
            }
        } catch (error) {
            console.error("Error", error);
        }
    };

    const inputSearch = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="HomePage" style={{ backgroundColor: backgroundColor }}>
            <div className="light">
            <button className="changeBackgroundButton" onClick={changeBackgroundColor}>
                {backgroundColor === "white" ? <img src="https://simpleicon.com/wp-content/uploads/sun.png" alt="sdfsdfsdf"/> : <img src="https://cdn-icons-png.flaticon.com/512/4445/4445942.png" alt="sdfsdfsdf"/>}
            </button>
            </div>
            <h1>Unsplash Images</h1>
            <div className="inputPart">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <button className="inputSearch" onClick={inputSearch}>
                    Search
                </button>
            </div>
            {noResults ? (
            <p>No results found.</p>
            ) : (
                <div className="img-list">
                    {images.map(({ id, alt_description, urls }) => (
                        <div className="img" key={id}>
                            <img src={urls.raw} alt={alt_description} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
