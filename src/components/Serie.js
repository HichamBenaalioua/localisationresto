import React, { useEffect, useRef, useState } from "react";
import Orders from "./Orders";
import {
  Avatar,
  Box,
  Button,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SerieList from "./lists/SerieList";

export const Context = React.createContext();

function Serie() {
  const [data, setData] = useState([]);
  const [modify, setModify] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get("http://localhost:8080/series/all");
      setData(response.data);
    };
    fetchdata();
  }, []);
  const buttonRef = useRef(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      nom: data.get("ville"),
    });

    if (buttonRef.current.innerText === "AJOUTER") {
      const response = await axios.post("http://localhost:8080/series/save", {
        nom: data.get("ville"),
      });
      console.log(response);
      navigate(0);
    } else if (buttonRef.current.innerText === "MODIFIER") {
      const response = await axios.post("http://localhost:8080/series/save", {
        id: modify.id,
        nom: data.get("ville"),
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
            label="Ajouter une Serie"
            name="ville"
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
        <SerieList data={data}></SerieList>
      </Box>
    </Context.Provider>
  );
}

export default Serie;
