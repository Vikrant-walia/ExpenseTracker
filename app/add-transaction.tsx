import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTransactions } from '../context/TransactionContext';

export default function AddTransactionScreen() {
  const router = useRouter();
  const { addTransaction } = useTransactions();
  const [form, setForm] = useState({
    date: '', amount: '', description: '', location: '', type: 'Debit', category: 'Shopping',
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const validateAndSubmit = () => {
    const { date, amount, description, location } = form;
    if (!date || !amount || !description || !location) {
      Alert.alert('Validation Error', 'Please fill all fields');
      return;
    }
    addTransaction(form);
    Alert.alert('Success', 'Transaction added!');
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Date</Text>
      <TextInput placeholder="YYYY-MM-DD" value={form.date} onChangeText={(val) => handleChange('date', val)} style={styles.input} />
      <Text style={styles.label}>Amount</Text>
      <TextInput placeholder="Amount" keyboardType="numeric" value={form.amount} onChangeText={(val) => handleChange('amount', val)} style={styles.input} />
      <Text style={styles.label}>Description</Text>
      <TextInput placeholder="Description" value={form.description} onChangeText={(val) => handleChange('description', val)} style={styles.input} />
      <Text style={styles.label}>Location</Text>
      <TextInput placeholder="Location" value={form.location} onChangeText={(val) => handleChange('location', val)} style={styles.input} />
      <Text style={styles.label}>Transaction Type</Text>
      <Picker selectedValue={form.type} onValueChange={(val) => handleChange('type', val)} style={styles.picker}>
        <Picker.Item label="Credit" value="Credit" />
        <Picker.Item label="Debit" value="Debit" />
        <Picker.Item label="Refund" value="Refund" />
      </Picker>
      <Text style={styles.label}>Category</Text>
      <Picker selectedValue={form.category} onValueChange={(val) => handleChange('category', val)} style={styles.picker}>
        <Picker.Item label="Shopping" value="Shopping" />
        <Picker.Item label="Travel" value="Travel" />
        <Picker.Item label="Utility" value="Utility" />
      </Picker>
      <View style={{ marginTop: 20 }}>
        <Button title="Add Transaction" onPress={validateAndSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 10, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 10, marginBottom: 5 },
  picker: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, marginBottom: 10 },
});
