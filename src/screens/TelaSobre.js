import { ScrollView, StyleSheet, Text, View } from 'react-native';

const itensSobre = [
  {
    titulo: 'Objetivo',
    texto: 'Acompanhar o nível de bolha em tempo real para auxiliar na análise de vibração e estabilidade do sistema.',
  },
  {
    titulo: 'Funcionalidade',
    texto: 'O app utiliza sensores do dispositivo para medir deslocamento e exibir informações visuais sobre o comportamento do ambiente.',
  },
  {
    titulo: 'Tecnologia',
    texto: 'Desenvolvido em React Native com Expo, com foco em uma interface simples, clara e responsiva.',
  },
];

export default function TelaSobre() {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.titulo}>Sobre</Text>
      <Text style={styles.subtitulo}>Informações sobre o aplicativo e sua finalidade.</Text>

      <View style={styles.cardPrincipal}>
        <Text style={styles.nomeApp}>Nível de Bolha</Text>
        <Text style={styles.descricao}>
          Aplicativo pensado para monitorar e visualizar dados do sensor com foco em leitura rápida,
          navegação simples e compreensão imediata dos resultados.
        </Text>
      </View>

      <View style={styles.listaContainer}>
        {itensSobre.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <Text style={styles.itemTitulo}>{item.titulo}</Text>
            <Text style={styles.itemTexto}>{item.texto}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 28,
    backgroundColor: '#F3F4F6',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 18,
  },
  cardPrincipal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 18,
  },
  nomeApp: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  descricao: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
  listaContainer: {
    gap: 12,
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  itemTexto: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 21,
  },
});
