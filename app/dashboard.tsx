import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTransactions } from '../context/TransactionContext';

export default function DashboardScreen() {
  const router = useRouter();
  const { transactions } = useTransactions();

  const renderTransaction = ({ item }) => (
    <TouchableOpacity
      style={styles.transaction}
      onPress={() => router.push({ pathname: '/transaction-detail', params: { ...item } })}
    >
      <View>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.sub}>{item.category} • {item.date}</Text>
      </View>
      <Text style={styles.amount}>${item.amount}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Your Transactions</Text>
        <Pressable onPress={() => router.replace('/')}> 
          <Ionicons name="log-out-outline" size={28} color="#e74c3c" />
        </Pressable>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransaction}
        ListEmptyComponent={<Text style={styles.empty}>No transactions yet.</Text>}
        style={{ flex: 1 }}
      />

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/add-transaction')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9', paddingHorizontal: 20, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50' },
  transaction: { padding: 16, backgroundColor: '#fff', borderRadius: 10, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, elevation: 3 },
  desc: { fontSize: 16, fontWeight: '500' },
  sub: { fontSize: 13, color: '#7f8c8d' },
  amount: { fontSize: 16, fontWeight: '600', color: '#16a085' },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#888' },
  fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#27ae60', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, elevation: 5 },
});
