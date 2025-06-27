import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function TransactionDetailScreen() {
  const router = useRouter();
  const { date, amount, description, location, type, category } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Details</Text>
      <Text style={styles.label}>Date: <Text style={styles.value}>{date}</Text></Text>
      <Text style={styles.label}>Amount: <Text style={styles.value}>${amount}</Text></Text>
      <Text style={styles.label}>Description: <Text style={styles.value}>{description}</Text></Text>
      <Text style={styles.label}>Location: <Text style={styles.value}>{location}</Text></Text>
      <Text style={styles.label}>Type: <Text style={styles.value}>{type}</Text></Text>
      <Text style={styles.label}>Category: <Text style={styles.value}>{category}</Text></Text>
      <Button title="Back to Dashboard" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 10, fontWeight: '500' },
  value: { fontWeight: 'normal', color: '#333' },
});