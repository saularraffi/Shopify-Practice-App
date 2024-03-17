import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
    const [data, setData] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("/api/apps/debug/rest");
            console.log(response.data);
        }

        fetchData();
    }, [data]);

    return (
        // <PolarisProvider i18n={translations}>
        //     <AppBridgeProvider>
        <p>Product Name: {data}</p>
        //     </AppBridgeProvider>
        // </PolarisProvider>
    );
}
