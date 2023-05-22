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

export const Context = React.createContext();

function Zone() {
  const [data, setData] = useState([]);
  const [ville, setVille] = useState([]);
  const [modify, setModify] = useState({ ville: { id: 0 } });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get("http://localhost:8080/zones/all");
      setData(response.data);
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      nom: data.get("zone"),
      ville: {
        id: data.get("ville"),
      },
    });

    if (buttonRef.current.innerText === "AJOUTER") {
      const response = await axios.post("http://localhost:8080/zones/save", {
        nom: data.get("zone"),
        ville: {
          id: data.get("ville"),
        },
      });
      console.log(response);
      navigate(0);
    } else if (buttonRef.current.innerText === "MODIFIER") {
      const response = await axios.post("http://localhost:8080/zones/save", {
        id: modify.id,
        nom: data.get("zone"),
        ville: {
          id: modify.ville.id,
        },
      });
      console.log(response);
      navigate(0);
    }
  };

  return (
    <Context.Provider value={[modify, setModify]}>
      <Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Ajouter une Zone"
            name="zone"
            required
            fullWidth
            margin="normal"
            autoFocus
            value={modify.nom}
            onChange={(e) =>
              setModify((prev) => ({ ...prev, nom: e.target.value }))
            }
            inputRef={(input) => input && input.focus()}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="ville"
              name="ville"
              value={modify.ville.id}
              onChange={(e) =>
                setModify((prev) => ({
                  ...prev,
                  ville: { id: e.target.value },
                }))
              }
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
        <ZoneList data={data}></ZoneList>
      </Box>
    </Context.Provider>
  );
}

export default Zone;
