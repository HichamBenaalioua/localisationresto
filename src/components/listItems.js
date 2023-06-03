import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LayersIcon from "@mui/icons-material/Layers";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { Link } from "react-router-dom";

export const mainListItems = (role) => (
  <React.Fragment>
    {role === "ROLE_PROPRETAIRE" ? (
      ""
    ) : (
      <ListItemButton>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>

        <Link className="linksl" to="ville">
          <ListItemText primary={`Gestion des Villes`} />
        </Link>
      </ListItemButton>
    )}
    {role === "ROLE_PROPRETAIRE" ? (
      ""
    ) : (
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link className="linksl" to="zone">
          <ListItemText primary="Gestion des Zones" />
        </Link>
      </ListItemButton>
    )}
    {role === "ROLE_PROPRETAIRE" ? (
      ""
    ) : (
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link className="linksl" to="serie">
          <ListItemText primary="Gestion des Serie" />
        </Link>
      </ListItemButton>
    )}
    {role === "ROLE_ADMIN" ? (
      ""
    ) : (
      <ListItemButton>
        <ListItemIcon>
          <RestaurantIcon />
        </ListItemIcon>
        <Link className="linksl" to="restaurant">
          <ListItemText primary="Gestion des Restaurant" />
        </Link>
      </ListItemButton>
    )}
    {role === "ROLE_PROPRETAIRE" ? (
      ""
    ) : (
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link className="linksl" to="specialite">
          <ListItemText primary="Gestion des Specialite" />
        </Link>
      </ListItemButton>
    )}
  </React.Fragment>
);
