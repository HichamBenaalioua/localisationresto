import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Title";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import { Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../Serie";

export default function SerieList(props) {
  const navigate = useNavigate();
  const [modify, setModify] = React.useContext(Context);
  const handledelete = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/series/delete/${id}`
    );
    console.log(response);
    navigate(0);
  };
  return (
    <React.Fragment>
      <Paper sx={{ mt: 10, p: 2, display: "flex", flexDirection: "column" }}>
        <Title>List des Serie</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nom</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.nom}</TableCell>
                <TableCell>
                  <AutoFixNormalIcon
                    className="blue"
                    onClick={() => setModify({ id: data.id, nom: data.nom })}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <DeleteIcon
                    className="red"
                    onClick={() => handledelete(data.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
}
