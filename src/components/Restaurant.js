import React, { useEffect, useRef, useState } from "react";
import Orders from "./Orders";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ZoneList from "./lists/ZoneList";
import RestaurantList from "./lists/RestaurantList";

export const Context = React.createContext();

function Restaurant() {
  const [data, setData] = useState([]);
  const [ville, setVille] = useState([]);
  const [modify, setModify] = useState({
    serie: { id: 0 },
    zone: { id: 0, ville: { id: 0 } },
  });
  const [zones, setZones] = useState([]);
  const [specialites, setSpecialites] = useState([]);

  const [serie, setSerie] = useState([]);
  const [spec, setSpec] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get("http://localhost:8080/restaurants/all");
      setData(response.data);
      console.log(response.data);
    };
    fetchdata();
  }, []);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get("http://localhost:8080/series/all");
      setSerie(response.data);
      console.log(response.data);
    };
    fetchdata();
  }, []);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get("http://localhost:8080/specialites/all");
      setSpecialites(response.data);
      console.log(response.data);
    };
    fetchdata();
  }, []);
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get("http://localhost:8080/villes/all");
      setVille(response.data);
      console.log(response.data);
    };
    fetchdata();
  }, []);
  const buttonRef = useRef(null);
  const handlevillechange = async (e) => {
    setModify((prev) => ({
      ...prev,
      zone: { ville: { id: e.target.value } },
    }));
    const respone = await axios.get(
      `http://localhost:8080/villes/${e.target.value}/zones`
    );
    console.log(respone.data);
    setZones(respone.data);
  };
  const handlemultiplevalues = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push({ id: options[i].value });
      }
    }
    setSpec(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      nom: data.get("nomrestaurant"),
      adresse: data.get("adresse"),
      description: data.get("description"),
      latitude: data.get("latitude"),
      longitude: data.get("longitude"),
      hourOpened: data.get("open"),
      hourClosed: data.get("close"),
      zone: {
        id: data.get("zoneresto"),
      },
      serie: {
        id: data.get("serieresto"),
      },
      photos: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
      specialite: spec,
      user: {
        id: JSON.parse(localStorage.getItem("userdata")).id,
      },
    });

    if (buttonRef.current.innerText === "AJOUTER") {
      const response = await axios.post(
        "http://localhost:8080/restaurants/save",
        {
          nom: data.get("nomrestaurant"),
          adresse: data.get("adresse"),
          description: data.get("description"),
          latitude: data.get("latitude"),
          longitude: data.get("longitude"),
          hourOpened: data.get("open"),
          hourClosed: data.get("close"),
          zone: {
            id: data.get("zoneresto"),
          },
          serie: {
            id: data.get("serieresto"),
          },
          photos: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
          specialite: spec,
          user: {
            id: JSON.parse(localStorage.getItem("userdata")).id,
          },
        }
      );
      console.log(response);
      navigate(0);
    } else if (buttonRef.current.innerText === "MODIFIER") {
      const response = await axios.post(
        "http://localhost:8080/restaurants/save",
        {
          id: modify.id,
          nom: data.get("nomrestaurant"),
          adresse: data.get("adresse"),
          description: data.get("description"),
          latitude: data.get("latitude"),
          longitude: data.get("longitude"),
          hourOpened: data.get("open"),
          hourClosed: data.get("close"),
          zone: {
            id: data.get("zoneresto"),
          },
          serie: {
            id: data.get("serieresto"),
          },
          photos: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
          specialite: spec,
          user: {
            id: JSON.parse(localStorage.getItem("userdata")).id,
          },
        }
      );
      console.log(response);
      navigate(0);
    }
  };

  return (
    <Context.Provider value={[modify, setModify]}>
      <Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter le nom de votre restaurant"
            name="nomrestaurant"
            required
            fullWidth
            margin="normal"
            autoFocus
            value={modify.nom}
            onChange={(e) =>
              setModify((prev) => ({ ...prev, nom: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Enter la adresse de votre restaurant"
            name="adresse"
            required
            fullWidth
            margin="normal"
            autoFocus
            value={modify.adresse}
            onChange={(e) =>
              setModify((prev) => ({ ...prev, adresse: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Enter la description de votre restaurant"
            name="description"
            required
            fullWidth
            margin="normal"
            autoFocus
            value={modify.description}
            onChange={(e) =>
              setModify((prev) => ({ ...prev, description: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Enter latitude de votre restaurant"
            name="latitude"
            required
            fullWidth
            margin="normal"
            autoFocus
            value={modify.latitude}
            onChange={(e) =>
              setModify((prev) => ({ ...prev, latitude: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Enter longitude de votre restaurant"
            name="longitude"
            required
            fullWidth
            margin="normal"
            autoFocus
            value={modify.longitude}
            onChange={(e) =>
              setModify((prev) => ({ ...prev, longitude: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Enter l'heure d'ouverture"
            name="open"
            required
            fullWidth
            margin="normal"
            autoFocus
            value={modify.hourOpened}
            onChange={(e) =>
              setModify((prev) => ({ ...prev, hourOpened: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Enter l'heure de fermeture"
            name="close"
            required
            fullWidth
            margin="normal"
            autoFocus
            value={modify.hourClosed}
            onChange={(e) =>
              setModify((prev) => ({ ...prev, hourClosed: e.target.value }))
            }
            InputLabelProps={{ shrink: true }}
          />

          <FormControl sx={{ mt: 3 }} fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-sel"
              label="ville"
              name="villeresto"
              value={modify.zone.ville.id}
              onChange={(e) => handlevillechange(e)}
            >
              <MenuItem disabled value={0}>
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
              value={modify.zone.id}
              onChange={(e) =>
                setModify((prev) => ({
                  ...prev,
                  zone: {
                    id: e.target.value,
                    ville: { id: modify.zone.ville.id },
                  },
                }))
              }
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
          <FormControl sx={{ mt: 3 }} fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-sel"
              label="ville"
              name="serieresto"
              value={modify.serie.id}
              onChange={(e) =>
                setModify((prev) => ({
                  ...prev,
                  serie: { id: e.target.value },
                }))
              }
            >
              <MenuItem disabled value={0}>
                selectionner une serie
              </MenuItem>
              {serie.map((v) => (
                <MenuItem key={v.id} value={v.id}>
                  {v.nom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mt: 3 }} fullWidth>
            <InputLabel shrink htmlFor="select-multiple-native">
              selectionner votre specialite
            </InputLabel>
            <Select
              multiple
              native
              label="Native"
              onChange={handlemultiplevalues}
              inputProps={{
                id: "select-multiple-native",
              }}
            >
              {specialites.map((specialite) => (
                <option value={specialite.id}>{specialite.nom}</option>
              ))}
            </Select>
          </FormControl>
          <Button
            sx={{ mt: 5 }}
            type="submit"
            name="button"
            variant="contained"
            color="primary"
            ref={buttonRef}
          >
            {modify.id == null ? "Ajouter" : "Modifier"}
          </Button>
        </form>
        <RestaurantList data={data}></RestaurantList>
      </Box>
    </Context.Provider>
  );
}

export default Restaurant;
