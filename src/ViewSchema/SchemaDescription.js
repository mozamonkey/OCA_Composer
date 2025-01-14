import React, { useContext } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Context } from "../App";

export default function SchemaDescription({ currentLanguage }) {
  const { schemaDescription, divisionGroup } = useContext(Context);
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: "bold",
          textAlign: "left",
          margin: "1rem 0 0.5rem 0",
        }}
      >
        Name of Schema
      </Typography>
      <Box sx={{
        textAlign: 'left',
        width: "30rem",
        overflowY: 'auto'
      }}>
        {schemaDescription[currentLanguage].name}
      </Box>
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: "bold",
          textAlign: "left",
          margin: "1rem 0 0.5rem 0",
        }}
      >
        Description
      </Typography>
      <Box sx={{
        textAlign: 'left',
        width: "30rem",
      }}>
        {schemaDescription[currentLanguage].description}
      </Box>
      <Typography
        sx={{
          fontSize: 15,
          fontWeight: "bold",
          textAlign: "left",
          margin: "1rem 0 0.5rem 0",
        }}
      >
        Classification
      </Typography>
      <Box sx={{
        textAlign: 'left',
        width: "30rem",
        overflowY: 'auto'
      }}>
        {divisionGroup.group || divisionGroup.division}
      </Box>
    </Box>
  );
}
