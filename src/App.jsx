import { Route, Router, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Scan from "./Scan";
import Values from "./Values";
import SpinnerComponent from "./Spinner";
import ErrorComponent from "./Error";

function App() {
    let [scans, setScans] = useState([]);
    let [isLoading, setLoading] = useState(true);
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        fetch(VITE_BACKEND_URL)
            .then((response) => response.json())
            .then((data) => {
                setScans(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(true);
            });
    }, []);

    if (isLoading) {
        return <SpinnerComponent />;
    }

    return (
        <Routes>
            <Route path="/" element={<Dashboard scans={scans} />} />
            <Route path="/scan/:scan_id" element={<Scan scans={scans} />} />
            <Route
                path="/value/:scan_id/:crit_id/:var_id"
                element={<Values />}
            />
            <Route path="*" element={<ErrorComponent />} />
        </Routes>
    );
}

export default App;
