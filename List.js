import React, { useState, useEffect } from "react";

import GreenViewImage from "../components/pictures/1.jpg";
import Skyline from "../components/pictures/2.jpg";
import RoseGarden from "../components/pictures/3.jpg";

const HostelList = () => {
  // State to hold hostel data
  const [hostels, setHostels] = useState([]);

  // Mock data (replace with API call later)
  useEffect(() => {
    const fetchHostels = async () => {
      const data = [
        {
          id: 1,
          name: "Green View Hostel",
          location: "Kathmandu, Nepal",
          price: 5000,
          amenities: ["WiFi", "Laundry", "Canteen"],
          image: GreenViewImage,
        },
        {
          id: 2,
          name: "Skyline Boys Hostel",
          location: "Lalitpur, Nepal",
          price: 4000,
          amenities: ["Parking", "Hot Water", "24/7 Security"],
          image: Skyline,
        },
        {
          id: 3,
          name: "Rose Garden Hostel",
          location: "Bhaktapur, Nepal",
          price: 4500,
          amenities: ["Library", "Air Conditioning", "Gym"],
          image: RoseGarden,
        },
      ];
      setHostels(data); // Update state with mock data
    };

    fetchHostels();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hostel List</h1>
      <div style={styles.grid}>
        {hostels.length > 0 ? (
          hostels.map((hostel) => (
            <div key={hostel.id} style={styles.card}>
              <img
                src={hostel.image}
                alt={hostel.name}
                style={styles.image}
              />
              <div style={styles.cardContent}>
                <h2 style={styles.cardTitle}>{hostel.name}</h2>
                <p>
                  <strong>Location:</strong> {hostel.location}
                </p>
                <p>
                  <strong>Price:</strong> Rs. {hostel.price}/month
                </p>
                <p>
                  <strong>Amenities:</strong> {hostel.amenities.join(", ")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading hostels...</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "15px",
  },
  cardTitle: {
    margin: "0 0 10px",
    fontSize: "20px",
    fontWeight: "bold",
  },
};

export default HostelList;
