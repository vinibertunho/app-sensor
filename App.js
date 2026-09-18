import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './src/components/Header';
import TabBar from './src/components/TabBar';
import TelaHistorico from './src/screens/TelaHistorico';
import TelaInicio from './src/screens/TelaInicio';
import TelaMedidor from './src/screens/TelaMedidor';
import TelaSobre from './src/screens/TelaSobre';

export default function App() {
  const [abaAtual, setAbaAtual] = useState('inicio');
  const [historico, setHistorico] = useState([]);

  const renderConteudo = useMemo(() => {
    switch (abaAtual) {
      case 'inicio':
        return <TelaInicio />;
      case 'nivel':
        return <TelaMedidor onSalvar={salvarMedicao} />;
      case 'historico':
        return <TelaHistorico historico={historico} onLimpar={limparHistorico} />;
      case 'sobre':
        return <TelaSobre />;
      default:
        return <TelaInicio />;
    }
  }, [abaAtual, historico]);

  function salvarMedicao(dados) {
    const agora = new Date();
    const horario = agora.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const novaLeitura = {
      id: Date.now(),
      horario,
      x: Number(dados.x).toFixed(2),
      y: Number(dados.y).toFixed(2),
      z: Number(dados.z).toFixed(2),
      nivelado: dados.nivelado,
    };

    setHistorico((anterior) => [novaLeitura, ...anterior].slice(0, 10));
  }

  function limparHistorico() {
    setHistorico([]);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header />
      {renderConteudo}
      <TabBar abaAtual={abaAtual} onSelecionarAba={setAbaAtual} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
});
