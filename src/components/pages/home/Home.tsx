"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SkyboxList from "@/components/SkyboxList";
function HomePage() {
  const [skyboxStyles, setSkyboxStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSkyboxStyles = async () => {
      try {
        const response = await axios.get(
          "https://backend.blockadelabs.com/api/v1/skybox/styles?api_key=I15XptG5KjIwn3DzuLDvBTySrItwIPArVE1KyQb6OghUDeAkT9C8liWrcTXk"
        );
        setSkyboxStyles(response.data);
      } catch (err) {
        setError("Failed to fetch skybox styles");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkyboxStyles();
  }, []);

  return (
    <div className="h-screen ">
      <main className="main">
        {loading ? (
          <p>Loading skybox styles...</p>
        ) : error !== "" ? (
          <p className="error">{error}</p>
        ) : (
          <SkyboxList styles={skyboxStyles} />
        )}
      </main>
    </div>
  );
}

export default HomePage;
