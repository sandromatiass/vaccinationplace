import React, { useState, useEffect } from 'react';
import { Container, Typography, Select, MenuItem, FormControl, InputLabel, List, ListItem, Grid, Card, CardContent, Divider, Box } from '@mui/material';
import api from '../../services/api';

export default function ListPointVaccination() {
  const [estados, setEstados] = useState<any[]>([]);
  const [cidades, setCidades] = useState<any[]>([]);
  const [pontos, setPontos] = useState<any[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>('');


  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await api.get('/api/vaccination/estados');
        setEstados(response.data);
      } catch (error) {
        console.error('Erro ao buscar estados', error);
      }
    };
    fetchEstados();
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      const fetchCidades = async () => {
        try {
          const response = await api.get(`/api/vaccination/estados/${estadoSelecionado}`);
          console.log('Cidades recebidas:', response.data);
          

          setCidades(response.data.cidades || []); 
        } catch (error) {
          console.error('Erro ao buscar cidades', error);
        }
      };
      fetchCidades();
    }
  }, [estadoSelecionado]);


  useEffect(() => {
    if (cidadeSelecionada) {
      const fetchPontos = async () => {
        try {
          const response = await api.get(`/api/vaccination/cidades/${cidadeSelecionada}/pontos`);
          setPontos(response.data);
        } catch (error) {
          console.error('Erro ao buscar pontos de vacinação', error);
        }
      };
      fetchPontos();
    }
  }, [cidadeSelecionada]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom color="primary">
        Pontos de vacinação
      </Typography>
      <Typography variant='body1' gutterBottom color="textSecondary">
        Selecione o estado e a cidade para buscar os pontos de vacinação.
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Estado</InputLabel>
            <Select
              value={estadoSelecionado}
              onChange={(e) => setEstadoSelecionado(e.target.value)}
              label="Estado"
              color="primary"
            >
              {estados.map((estado) => (
                <MenuItem key={estado.id} value={estado.sigla}>
                  {estado.nome} ({estado.sigla})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>


        <Grid item xs={12} md={6}>
          <FormControl fullWidth disabled={!estadoSelecionado}>
            <InputLabel>Cidade</InputLabel>
            <Select
              value={cidadeSelecionada}
              onChange={(e) => setCidadeSelecionada(e.target.value)}
              label="Cidade"
              color="primary"
            >
              {cidades.map((cidade) => (
                <MenuItem key={cidade.id} value={cidade.id}>
                  {cidade.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>


        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="secondary">
            Pontos de Vacinação:
          </Typography>
          <List>
            {pontos.map((ponto) => (
              <ListItem key={ponto.id} sx={{ marginBottom: 2 }}>
                <Card variant="outlined" sx={{ width: '100%', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      {ponto.nome}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {ponto.endereco}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}
