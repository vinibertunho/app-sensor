import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const metricas = [
  { id: 1, label: 'Nível', valor: '72%', detalhe: 'Normal', cor: '#2563EB' },
  { id: 2, label: 'Pressão', valor: '1.8', detalhe: 'kPa', cor: '#10B981' },
  { id: 3, label: 'Vibração', valor: '0.6', detalhe: 'Hz', cor: '#F59E0B' },
];

const alertas = [
  'Sensor está estável',
  'Última leitura há 2 min',
  'Sem falhas de comunicação',
];

export default function TelaInicio() {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.titulo}>Visão geral</Text>
      <Text style={styles.subtitulo}>Monitoramento em tempo real do nível de bolha.</Text>

      <View style={styles.cardPrincipal}>
        <Text style={styles.rotuloStatus}>Status atual</Text>

        <View style={styles.areaNivel}>
          <View style={styles.anelExterno}>
            <View style={styles.anelInterno}>
              <Text style={styles.porcentagem}>72%</Text>
              <Text style={styles.labelNivel}>Nível</Text>
            </View>
          </View>
        </View>

        <Text style={styles.statusTexto}>Tudo dentro do limite esperado</Text>
        <Text style={styles.statusDetalhe}>Atenção mínima exigida: 60% • Máximo recomendado: 85%</Text>

        <TouchableOpacity style={styles.botao} activeOpacity={0.8}>
          <Text style={styles.botaoTexto}>Iniciar leitura</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gridMetricas}>
        {metricas.map((item) => (
          <View key={item.id} style={styles.cardMedida}>
            <Text style={styles.medidaLabel}>{item.label}</Text>
            <Text style={[styles.medidaValor, { color: item.cor }]}>{item.valor}</Text>
            <Text style={styles.medidaDetalhe}>{item.detalhe}</Text>
          </View>
        ))}
      </View>

      <View style={styles.cardAvisos}>
        <Text style={styles.cardTitulo}>Sistema</Text>
        {alertas.map((item, index) => (
          <View key={index} style={styles.itemAviso}>
            <View style={styles.ponto} />
            <Text style={styles.textoAviso}>{item}</Text>
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
    paddingBottom: 26,
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
    marginBottom: 16,
  },
  cardPrincipal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 18,
  },
  rotuloStatus: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  areaNivel: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  anelExterno: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anelInterno: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: '#93C5FD',
  },
  porcentagem: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1D4ED8',
  },
  labelNivel: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
    marginTop: 4,
  },
  statusTexto: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 6,
  },
  statusDetalhe: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 18,
  },
  botao: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  gridMetricas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 10,
  },
  cardMedida: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  medidaLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '600',
  },
  medidaValor: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  medidaDetalhe: {
    fontSize: 12,
    color: '#6B7280',
  },
  cardAvisos: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  itemAviso: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ponto: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 10,
  },
  textoAviso: {
    fontSize: 13,
    color: '#374151',
    flex: 1,
  },
});
