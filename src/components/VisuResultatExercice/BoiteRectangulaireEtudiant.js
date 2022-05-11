import React, { useEffect, useState } from "react";
import EtudiantCliquable from "../EtudiantCliquable/EtudiantCliquable"; //TODO ALIAS SUR LE COMPONENT
import PropTypes from "prop-types";

import BoiteRectangulaireEtudiant from "./BoiteRectangulaireEtudiant";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Item from "@mui/material/ListItem";

// construire Box par étudiant

const construitListeBoxEtudiants = (listeEtudiants, idExo) =>
  listeEtudiants.map((etu, index) => {
    console.log("Etu :", etu, "listeEtudiants :", listeEtudiants);
    return (
      <Item key={index}>
        <BoiteRectangulaireEtudiant etudiant={etu} exercice={exo} />
      </Item>
    );
  });

const Exercice = (props) => {
  const exo = props.exo;
  const listeEtudiants = props.listeEtudiants;

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
    >
      <Item sx={{ width: "250px" }}>
        <EtudiantCliquable idExo={exo.idExo} />
      </Item>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        {construitListeBoxEtudiants(listeEtudiants, exo)}
      </Stack>
    </Stack>
  );
};

Exercice.propTypes = {
  listeEtudiants: PropTypes.arrayOf.isRequired,
  exo: PropTypes.object.isRequired,
};

export default Exercice;
