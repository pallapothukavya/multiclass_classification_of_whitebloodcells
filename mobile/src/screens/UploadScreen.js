import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_URL } from '../Constants';

const UploadScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const pickImage = async () => {
    // Request permission first (required on Android for SDK 54)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photo library to select an image.",
        [{ text: "OK" }]
      );
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!pickerResult.canceled) {
      setImage(pickerResult.assets[0].uri);
      setResult(null);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("Error", "Please select an image first");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', {
      uri: image,
      name: 'upload.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post(`${API_URL}/api/predict/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Upload Error", error.response?.data?.detail || "Failed to classify image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>WBC Image Predictor</Text>
        </View>

        <View style={styles.uploadCard}>
          <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.placeholderBox}>
                <Text style={styles.placeholderIcon}>📷</Text>
                <Text style={styles.placeholderText}>Tap to Select Image</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.uploadButton, loading && styles.buttonDisabled]} 
            onPress={uploadImage}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.uploadButtonText}>Analyze Image</Text>
            )}
          </TouchableOpacity>
        </View>

        {result && (
          <View style={[styles.resultCard, result.status === 'invalid' ? styles.invalidCard : styles.successCard]}>
            <Text style={styles.resultTitle}>Analysis Result</Text>
            <Text style={styles.resultClass}>{result.predicted_class}</Text>
            <Text style={styles.resultConfidence}>Confidence: {(result.confidence * 100).toFixed(2)}%</Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 24, paddingTop: 60, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  backText: { color: '#3b82f6', fontSize: 16, fontWeight: '600', marginRight: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#f8fafc' },
  uploadCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    borderRadius: 24, 
    padding: 24, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.1)' 
  },
  imagePlaceholder: { 
    width: '100%', 
    height: 250, 
    backgroundColor: '#1e293b', 
    borderRadius: 16, 
    overflow: 'hidden', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderStyle: 'dashed', 
    borderWidth: 1, 
    borderColor: '#334155' 
  },
  image: { width: '100%', height: '100%' },
  placeholderBox: { alignItems: 'center' },
  placeholderIcon: { fontSize: 40, marginBottom: 12 },
  placeholderText: { color: '#64748b', fontSize: 16 },
  uploadButton: { 
    height: 56, 
    backgroundColor: '#3b82f6', 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 24 
  },
  buttonDisabled: { opacity: 0.7 },
  uploadButtonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  resultCard: { marginTop: 24, padding: 24, borderRadius: 24 },
  successCard: { backgroundColor: 'rgba(34, 197, 94, 0.15)', borderWidth: 1, borderColor: '#22c55e' },
  invalidCard: { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderWidth: 1, borderColor: '#ef4444' },
  resultTitle: { fontSize: 16, color: '#94a3b8', fontWeight: '600' },
  resultClass: { fontSize: 24, fontWeight: 'bold', color: '#f8fafc', marginTop: 4 },
  resultConfidence: { fontSize: 14, color: '#cbd5e1', marginTop: 8 },
});

export default UploadScreen;
