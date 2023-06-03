import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import Carousel from "react-material-ui-carousel";
const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 31.628674,
  lng: -7.992047,
};

function Map() {
  const [ville, setVille] = useState([]);
  const [zonevalue, setZonevalue] = useState(0);
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get("http://localhost:8080/villes/all");
      setVille(response.data);
    };
    fetchdata();
  }, []);
  const [zones, setZones] = useState([]);

  const handlechange = async (e) => {
    const respone = await axios.get(
      `http://localhost:8080/villes/${e.target.value}/zones`
    );
    setZones(respone.data);
  };
  const handleclick = async () => {
    const response = await axios.get(
      `http://localhost:8080/restaurants/byZoneId/${zonevalue}`
    );
    setRestaurant(response.data);
    console.log(response.data);
  };
  return (
    <div className="container">
      <div className="navcontainer">
        <p>Localisation Restaurant</p>
        <div className="logins">
          <a href="/signin">Signin</a>
          <a href="/signup">Signup</a>
        </div>
      </div>
      <div className="gridcontainer">
        <div className="griditemcontainer">
          <h1>List des Restaurants</h1>
          <div className="controls">
            <FormControl sx={{ mt: 3 }} fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-sel"
                label="ville"
                name="villeresto"
                onChange={handlechange}
              >
                <MenuItem selected disabled value={0}>
                  selectionner une ville
                </MenuItem>
                {ville.map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    {v.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ mt: 3 }} fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="zone"
                name="zoneresto"
                onChange={(e) => setZonevalue(e.target.value)}
              >
                <MenuItem disabled value={0}>
                  selectionner une zone
                </MenuItem>
                {zones.map((z) => (
                  <MenuItem key={z.id} value={z.id}>
                    {z.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleclick}
            >
              Rechercher
            </Button>
          </div>
          <div className="cardContainer">
            {restaurant === []
              ? ""
              : restaurant?.map((r) => (
                  <Card sx={{ width: 500, height: 250, mt: 9 }}>
                    <CardActionArea>
                      <Carousel>
                        {r.photos.map((photo) => (
                          <CardMedia
                            component="img"
                            height="140"
                            image={require(`../src/img/${photo.url}`)}
                            alt="alkdsjf asdlf"
                          />
                        ))}
                      </Carousel>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {r.nom}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {r.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
          </div>
        </div>
        <div className="griditemcontainer2">
          <LoadScript googleMapsApiKey="AIzaSyCSNW7Pt4PQZ7qxeT6rrTAQoBqpcw51KBE">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              {restaurant.map((rest) => (
                <Marker
                  position={{ lat: rest.latitude, lng: rest.longitude }}
                  icon={<DinnerDiningIcon />}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}

export default Map;
