import { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, Snackbar, Alert } from '@mui/material';
import api from '../../services/api';
import { data } from 'react-router-dom';

export default function Cadastro() {
  const [novoEstado, setNovoEstado] = useState<string>('');
  const [novaSigla, setNovaSigla] = useState<string>('');
  const [novoNomeCidade, setNovoNomeCidade] = useState<string>('');
  const [novoNomePonto, setNovoNomePonto] = useState<string>('');
  const [novoEnderecoPonto, setNovoEnderecoPonto] = useState<string>('');
  const [novoTelefonePonto, setNovoTelefonePonto] = useState<string>('');  
  const [novoEmailPonto, setNovoEmailPonto] = useState<string>('');  
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [severity, setSeverity] = useState<'success' | 'error'>('success');

  const handleCadastrar = async () => {
   
    const data = {
      nome: novoEstado,             
      sigla: novaSigla,             
      cidades: [
        {
          nome: novoNomeCidade,    
          pontos: [
            {
              nome: novoNomePonto,      
              endereco: novoEnderecoPonto, 
              telefone: novoTelefonePonto, 
              email: novoEmailPonto      
            }
          ]
        }
      ]
    };
  
    
    console.log('Dados que estão sendo enviados:', data);
  
    try {

      const response = await api.post('/api/vaccination/create-points', data);
  

      console.log('Resposta do servidor:', response.data);
  
      setSnackbarMessage('Cadastro realizado com sucesso!');
      setSeverity('success');
      setOpenSnackbar(true);
 
      setNovoEstado('');
      setNovaSigla('');
      setNovoNomeCidade('');
      setNovoNomePonto('');
      setNovoEnderecoPonto('');
      setNovoTelefonePonto('');
      setNovoEmailPonto('');
    } catch (error) {

      console.error('Erro ao cadastrar:', error);
      setSnackbarMessage('Erro ao realizar o cadastro.');
      setSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom color="primary">
        Cadastro de Estado, Cidade e Ponto de Vacinação
      </Typography>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Preencha os dados abaixo para cadastrar um estado, cidade e ponto de vacinação
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nome do Estado"
              fullWidth
              value={novoEstado}
              onChange={(e) => setNovoEstado(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Sigla do Estado"
              fullWidth
              value={novaSigla}
              onChange={(e) => setNovaSigla(e.target.value)}
            />
          </Grid>


          <Grid item xs={12} md={6}>
            <TextField
              label="Nome da Cidade"
              fullWidth
              value={novoNomeCidade}
              onChange={(e) => setNovoNomeCidade(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Nome do Ponto de Vacinação"
              fullWidth
              value={novoNomePonto}
              onChange={(e) => setNovoNomePonto(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Endereço do Ponto de Vacinação"
              fullWidth
              value={novoEnderecoPonto}
              onChange={(e) => setNovoEnderecoPonto(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Telefone do Ponto de Vacinação"
              fullWidth
              value={novoTelefonePonto}
              onChange={(e) => setNovoTelefonePonto(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="E-mail do Ponto de Vacinação"
              fullWidth
              value={novoEmailPonto}
              onChange={(e) => setNovoEmailPonto(e.target.value)}
            />
          </Grid>


          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleCadastrar}>
              Enviar Cadastro
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={severity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}