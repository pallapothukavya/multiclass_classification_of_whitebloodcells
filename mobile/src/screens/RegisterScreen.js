import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { API_URL } from '../Constants';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    loginid: '',
    password: '',
    mobile: '',
    email: '',
    locality: '',
    address: '',
    city: '',
    state: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = async () => {
    const { name, loginid, password, mobile, email } = formData;
    if (!name || !loginid || !password || !mobile || !email) {
      Alert.alert("Error", "Please fill all required fields (*)");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/user/register/`, formData);
      if (response.data.status === 'success') {
        Alert.alert("Success", response.data.message, [
          { text: "OK", onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        Alert.alert("Registration Failed", response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us and start classifying</Text>
          </View>

          <View style={styles.form}>
            {[
              { label: 'Full Name *', field: 'name', placeholder: 'Enter your full name' },
              { label: 'Login ID *', field: 'loginid', placeholder: 'Choose a unique ID' },
              { label: 'Password *', field: 'password', placeholder: 'Create a password', secure: true },
              { label: 'Mobile Number *', field: 'mobile', placeholder: 'Enter 10-digit number' },
              { label: 'Email Address *', field: 'email', placeholder: 'your@email.com' },
              { label: 'City', field: 'city', placeholder: 'Your city' },
              { label: 'State', field: 'state', placeholder: 'Your state' },
            ].map((input, index) => (
              <View key={index} style={styles.inputContainer}>
                <Text style={styles.label}>{input.label}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={input.placeholder}
                  placeholderTextColor="#64748b"
                  value={formData[input.field]}
                  onChangeText={(val) => handleChange(input.field, val)}
                  secureTextEntry={input.secure}
                  autoCapitalize="none"
                />
              </View>
            ))}

            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]} 
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 24, paddingTop: 60 },
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#f8fafc', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#94a3b8', textAlign: 'center', marginTop: 8 },
  form: { 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    borderRadius: 24, 
    padding: 24, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.1)' 
  },
  inputContainer: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#cbd5e1', marginBottom: 6, marginLeft: 4 },
  input: { 
    height: 52, 
    backgroundColor: '#1e293b', 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    color: '#f8fafc', 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: '#334155' 
  },
  button: { 
    height: 56, 
    backgroundColor: '#3b82f6', 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 12,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  backButton: { marginTop: 20, alignItems: 'center' },
  backText: { color: '#94a3b8', fontSize: 14, fontWeight: '600' },
});

export default RegisterScreen;
