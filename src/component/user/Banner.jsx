import "./Banner.css";

function Banner() {
    return (
        <div className="banner">
            <div className="banner-overlay">
                <h1>FOODYNERD</h1>
                <p>IS WHERE LIFE HAPPENS</p>
                <button onClick={() => document.getElementById("meals-section").scrollIntoView({ behavior: "smooth" })}>
                    DISCOVER
                </button>
            </div>
        </div>
    );
}

export default Banner;