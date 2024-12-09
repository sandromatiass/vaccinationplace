import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Sistema de Vacinação
        </Typography>
        <Button
          component={Link}
          to="/cadastro"
          color="inherit"
          sx={{ marginRight: 2 }}
        >
          Cadastro
        </Button>
        <Button
          component={Link}
          to="/consulta"
          color="inherit"
        >
          Consulta
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
