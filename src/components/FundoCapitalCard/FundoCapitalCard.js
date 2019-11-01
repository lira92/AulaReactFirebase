import React from 'react';
import './FundoCapitalCard.css';
import { Progress } from 'antd';
import accounting from 'accounting';

const FundoCapitalCard = (props) => {
  return (
    <div className="card">
      <div className="card-icon">
        <i
          className="fas fa-pen"
          onClick={props.editarFundoHandle}></i>
        <i
          className="fas fa-times"
          onClick={props.removerFundoHandle}></i>
      </div>
      <div className="card-content">
        <Progress
          type="dashboard"
          width={175}
          percent={props.porcentagem}
          strokeWidth={9}
          strokeColor="#001AA0"
          format={() => accounting.formatMoney(props.valorAtual, "R$ ", 2, ".", ",")}
        >
        </Progress>
      </div>
      <div className="card-footer">
        <span style={{ fontWeight: 'bold', color: '#001AA0' }}>{props.nome}</span>
      </div>
    </div>
  );
}

export default FundoCapitalCard;