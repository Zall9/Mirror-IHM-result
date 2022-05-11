const construitListeExo = (ListeExos) =>
  ListeExos.map((objetIdListeExo, index) => {
    console.log("ETUDIANT :", objetIdListeExo.idExo);
    // component="div" pour supprimer le warning (https://github.com/mui/material-ui/issues/19827)
    return (
      <Item key={index} component="div">
        <Exercice
          idExo={objetIdEtuListeExo.idExo}
          listeEtudiants={objetIdEtuListeExo.listeExos}
        />
      </Item>
    );
  });

const choixSessionSelect = (
  listeIdSession,
  choixSession,
  handleChangeSession
) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="choix-session">Session</InputLabel>
        <Select
          labelId="session-label"
          id="session-select"
          value={choixSession}
          label="Session"
          onChange={handleChangeSession}
        >
          {listeIdSession.map((idSession, index) => {
            //TODO: afficher les nom de sessions au lieu des ids
            return (
              <MenuItem key={index} value={idSession}>
                {idSession}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

const VisuResultatExerciceComponent = (props) => {
  const [choixSession, setSession] = React.useState(
    sessionStorage.getItem("idSes") ? sessionStorage.getItem("idSes") : ""
  );

  const handleChangeSession = (event) => {
    sessionStorage.setItem("idSes", event.target.value);
    setSession(event.target.value);
  };

  co;

  useEffect(() => {}, [choixSession]);

  // récupérer tous les exercices
  const exercices = useSelector(getExercices);
  const idSession = choixSession;

  // collecter tous les étudiants de chaque exercice
  // clé : idExo, valeur : listeEtudiants
  let ExosEtudiants = {};
  // tableau contenant tous les étudiants
  let ListeEtudiants = [];

  exercices.map((exo) => {
    if (exo.idSession == idSession) {
      if (ExosEtudiants[exo.idEtu] === undefined) {
        ExosEtudiants[exo.idEtu] = [];
        ListeEtudiants.push(exo.idEtu);
      }
      // On ajoute l'exercice à l'étudiant
      ExosEtudiants[exo.idEtu].push(exo);
    }
  });

  // On créer un tableau avec les étudiants et leurs exercices
  let ListeEtudiantsExos = [];
  Object.entries(ExosEtudiants).map(([idEtu, listeExos]) => {
    ListeEtudiantsExos.push({ idEtu: idEtu, listeExos: listeExos });
  });
  console.log("avant tri", ...ListeEtudiantsExos);

  // Trier ce tableau (par défaut alphabétique)
  triEtudiants(ListeEtudiantsExos, choixTri);
  console.log("après tri", ...ListeEtudiantsExos);

  console.log("listeEtudiantsExos avant appel", exercices);
  const listeIdSession = recupereSessions(exercices);

  return (
    <div>
      {choixSessionSelect(listeIdSession, choixSession, handleChangeSession)}
      {choixTriSelect(menuTri, choixTri, handleChangeTri)}
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={12}
      >
        {construitListeEtudiants(ListeEtudiantsExos)}
      </Stack>
    </div>
  );
};

export default VisuResultatEtudiantComponent;
