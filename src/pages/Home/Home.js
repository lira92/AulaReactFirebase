import React, { useState, useEffect } from 'react';
import './Home.css';
import FundoCapitalCard from 'components/FundoCapitalCard/FundoCapitalCard';
import CadastroFundoModal from 'components/CadastroFundoModal/CadastroFundoModal';
import FundoCapitalVazio from 'components/FundoCapitalVazio/FundoCapitalVazio';
import database from 'services/database';

const Home = () => {
  const [ visivel, setVisivel ] = useState(false);
  const [ fundoSelecionado, setFundoSelecionado ] = useState({});
  const [ fundos, setFundos ] = useState([]);

  useEffect(() => {
    database.listarFundos().then(response => {
      setFundos(response);
    });
  }, []);
  
  const editarFundo = fundo => {
    setFundoSelecionado(fundo);
    setVisivel(true);
  };

  const removerFundo = async fundo => {
    await database.removerFundo(fundo.id);
    database.listarFundos().then(response => {
      setFundos(response);
    });
  };

  const onClose = () => {
    setVisivel(false);
    database.listarFundos().then(response => {
      setFundos(response);
    });
  };

  return (
    <div className="row">
      {
        fundos.map(fundo => (
          <FundoCapitalCard
            key={fundo.id}
            porcentagem={fundo.porcentagem}
            nome={fundo.nome}
            valorAtual={fundo.valorAtual}
            editarFundoHandle={() => editarFundo(fundo)}
            removerFundoHandle={() => removerFundo(fundo)} />
        ))
      }
      <FundoCapitalVazio
        onClick={() => editarFundo({
          dataResgate: undefined,
          valorAtual: 0,
          valorNecessario: 0
        })}/>
      <CadastroFundoModal
        visivel={visivel}
        onClose={onClose}
        fundo={fundoSelecionado}/>
    </div>
  );
}

export default Home;