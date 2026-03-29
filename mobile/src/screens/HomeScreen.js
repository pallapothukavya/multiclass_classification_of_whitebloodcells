import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ route, navigation }) => {
  const { user } = route.params || { user: { name: 'User' } };

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.welcome}>Welcome,</Text>
            <Text style={styles.name}>{user.name}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>WBC Classification</Text>
            <Text style={styles.cardSub}>Detect and classify white blood cells effortlessly using our AI-powered tool.</Text>
            
            <TouchableOpacity 
              style={styles.mainButton}
              onPress={() => navigation.navigate('Upload')}
            >
              <Text style={styles.mainButtonText}>Start Detection</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>About the Tool</Text>
            <Text style={styles.infoText}>
              This application uses a deep learning model to classify images into four categories:
              {'\n'}• Eosinophil
              {'\n'}• Lymphocyte
              {'\n'}• Monocyte
              {'\n'}• Neutrophil
            </Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: { flex: 1, padding: 24, justifyContent: 'space-between', paddingBottom: 40 },
  header: { marginTop: 40 },
  welcome: { fontSize: 18, color: '#94a3b8' },
  name: { fontSize: 32, fontWeight: 'bold', color: '#f8fafc', marginTop: 4 },
  card: { 
    backgroundColor: '#3b82f6', 
    borderRadius: 32, 
    padding: 32, 
    marginTop: 40,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  cardTitle: { fontSize: 24, fontWeight: 'bold', color: '#ffffff' },
  cardSub: { fontSize: 14, color: 'rgba(255, 255, 255, 0.8)', marginTop: 8, lineHeight: 20 },
  mainButton: { 
    backgroundColor: '#ffffff', 
    borderRadius: 16, 
    height: 56, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 24 
  },
  mainButtonText: { color: '#3b82f6', fontSize: 18, fontWeight: 'bold' },
  infoSection: { marginTop: 40 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#f8fafc', marginBottom: 12 },
  infoText: { fontSize: 14, color: '#94a3b8', lineHeight: 22 },
  logoutButton: { alignSelf: 'center', marginTop: 40 },
  logoutText: { color: '#ef4444', fontSize: 16, fontWeight: '600' },
});

export default HomeScreen;
