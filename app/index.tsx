import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      router.replace('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Expense Tracker</Text>
      <TextInput placeholder="Username" style={styles.input} onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" color="#2ecc71" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#34495e' },
  input: { width: '100%', borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 8, borderColor: '#ccc', backgroundColor: '#fff' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
});