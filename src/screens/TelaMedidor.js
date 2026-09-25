import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function TelaMedidor({ onSalvar }) {
  const [dados, setDados] = useState({ x: 0, y: 0, z: 0 });
  const [sensorAtivo, setSensorAtivo] = useState(true);
  const [disponivel, setDisponivel] = useState(true);
  const [modoWeb, setModoWeb] = useState(Platform.OS === 'web');

  const { x, y, z } = dados;

  useEffect(() => {
    if (Platform.OS === 'web') {
      setDisponivel(true);
      setModoWeb(true);
      return;
    }

    let assinatura = null;
    let cancelado = false;

    Accelerometer.isAvailableAsync().then((suportado) => {
      if (cancelado) {
        return;
      }

      setDisponivel(suportado);

      if (suportado && sensorAtivo) {
        Accelerometer.setUpdateInterval(100);
        assinatura = Accelerometer.addListener((leitura) => {
          if (!cancelado) {
            setDados(leitura);
          }
        });
      }
    });

    return () => {
      cancelado = true;
      if (assinatura) {
        assinatura.remove();
      }
    };
  }, [sensorAtivo]);

  const estaNivelado = Math.abs(x) < 0.05 && Math.abs(y) < 0.05;
  const bolhaX = Math.min(Math.max(x * 120, -80), 80);
  const bolhaY = Math.min(Math.max(y * 120, -80), 80);

  function handleSalvar() {
    if (typeof onSalvar === 'function') {
      onSalvar({ x, y, z, nivelado: estaNivelado });
    }
  }

  function handleMoverBolha(event) {
    if (!sensorAtivo || Platform.OS !== 'web') {
      return;
    }

    const largura = 220;
    const posX = (event.nativeEvent.locationX ?? 110) / largura;
    const posY = (event.nativeEvent.locationY ?? 110) / largura;

    const novoX = (posX - 0.5) * 2;
    const novoY = (0.5 - posY) * 2;

    setDados({
      x: Number((novoX * 0.9).toFixed(2)),
      y: Number((novoY * 0.9).toFixed(2)),
      z: 0,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Medidor</Text>

      <View
        style={styles.mostrador}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderMove={handleMoverBolha}
      >
        <View style={styles.marcador}>
          <View
            style={[
              styles.bolha,
              { transform: [{ translateX: bolhaX }, { translateY: bolhaY }] },
            ]}
          />
        </View>
      </View>

      <Text style={styles.dados}>
        x: {x.toFixed(2)} | y: {y.toFixed(2)} | z: {z.toFixed(2)}
      </Text>

      <Text style={styles.status}>
        {modoWeb ? 'Modo web: mova o mouse no mostrador' : estaNivelado ? 'Nívelado' : 'Movimento detectado'}
      </Text>

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => setSensorAtivo((prev) => !prev)}
        >
          <Text style={styles.botaoTexto}>
            {sensorAtivo ? 'Desativar sensor' : 'Ativar sensor'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoSecundario]} onPress={handleSalvar}>
          <Text style={styles.botaoTexto}>Salvar medição</Text>
        </TouchableOpacity>
      </View>

      {!disponivel && (
        <Text style={styles.aviso}>Sensor não disponível no dispositivo.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mostrador: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#CBD5E1',
  },
  marcador: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#94A3B8',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bolha: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#2563EB',
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -13,
    marginTop: -13,
  },
  dados: {
    marginTop: 20,
    fontSize: 14,
    color: '#374151',
  },
  status: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  botoesContainer: {
    width: '100%',
    marginTop: 18,
    gap: 10,
  },
  botao: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoSecundario: {
    backgroundColor: '#10B981',
  },
  botaoTexto: {
    color: '#FFF',
    fontWeight: '700',
  },
  aviso: {
    marginTop: 12,
    color: '#DC2626',
    fontWeight: '600',
  },
});