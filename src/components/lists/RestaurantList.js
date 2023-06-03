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
import { Context } from "../Restaurant";
import Carousel from "react-material-ui-carousel";

export default function RestaurantList(props) {
  const navigate = useNavigate();
  const [modify, setModify] = React.useContext(Context);
  const handledelete = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/restaurants/delete/${id}`
    );
    console.log(response);
    navigate(0);
  };
  return (
    <React.Fragment>
      <Paper sx={{ mt: 10, p: 2, display: "flex", flexDirection: "column" }}>
        <Title>List des Restaurants</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Open & Close hours</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Ville</TableCell>
              <TableCell>Zone</TableCell>
              <TableCell>Serie</TableCell>
              <TableCell>Specialite</TableCell>
              <TableCell>Images</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.nom}</TableCell>
                <TableCell>{data.adresse}</TableCell>
                <TableCell>{data.description}</TableCell>
                <TableCell>
                  open on {data.hourOpened}H closes on {data.hourClosed}H
                </TableCell>
                <TableCell>{data.latitude}</TableCell>
                <TableCell>{data.longitude}</TableCell>
                <TableCell>{data.zone.ville.nom}</TableCell>
                <TableCell>{data.zone.nom}</TableCell>
                <TableCell>{data.serie.nom}</TableCell>
                <TableCell>
                  <ul>
                    {data.specialite.map((spc) => (
                      <li>{spc.nom}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <Carousel sx={{ width: 290, height: 200 }}>
                    {data.photos.map((photo) => (
                      <img
                        width="290px"
                        src={require(`../../img/${photo.url}`)}
                        alt=""
                      />
                    ))}
                  </Carousel>
                </TableCell>

                <TableCell>
                  <AutoFixNormalIcon
                    className="blue"
                    onClick={() =>
                      setModify({
                        id: data.id,
                        nom: data.nom,
                        adresse: data.adresse,
                        description: data.description,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        hourOpened: data.hourOpened,
                        hourClosed: data.hourClosed,
                        zone: {
                          id: data.zone.id,
                          ville: {
                            id: data.zone.ville.id,
                          },
                        },
                        serie: {
                          id: data.serie.id,
                        },
                      })
                    }
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
