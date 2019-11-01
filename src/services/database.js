import * as firebase from "firebase/app";
import 'firebase/firestore';

const enriquecerObjeto = fundo => {
  return {
    ...fundo,
    porcentagem: (fundo.valorAtual * 100) / fundo.valorNecessario
  }
};

const adicionarFundo = fundo => {
  const db = firebase.firestore();
  return db.collection('fundos').add(enriquecerObjeto(fundo));
}

const editarFundo = (id, fundo) => {
  const db = firebase.firestore();
  return db.collection(`fundos`).doc(id).set(enriquecerObjeto(fundo));
}

const removerFundo = id => {
  const db = firebase.firestore();
  return db.collection('fundos').doc(id).delete();
}

const listarFundos = async () => {
  const db = firebase.firestore();
  const response = await db.collection('fundos').get();
  return response.docs.map((item) => {
    return {
      id: item.id,
      ...item.data()
    };
  });
}

export default {
  adicionarFundo,
  editarFundo,
  removerFundo,
  listarFundos
}