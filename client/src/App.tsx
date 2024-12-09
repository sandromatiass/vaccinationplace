import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/Header/HeaderComponent';
import ListPointVaccination from './screens/ListPointVaccination/ListPointVaccination';
import Cadastro from './screens/CreatePointVaccination/CreatePointVaccination';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/consulta" element={<ListPointVaccination />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
