import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GenerateReport = () => {
  const navigation = useNavigation();
  const [doctorName, setDoctorName] = useState('');
  const [report, setReport] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://192.168.85.232:3000/api/doctorreports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorName, report, date }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      Alert.alert('Success', 'Report submitted successfully.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (error) {
      console.error('Failed to submit report:', error);
      Alert.alert('Error', 'Failed to submit report. Please try again.');
    }
  };

  return (
    <LinearGradient
      colors={['rgb(224,188,65)', 'rgb(99,192,151)', 'rgb(179,189,96)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>IBM</Text>
      </View>
      <View style={styles.formContainer}>
      
        <Text style={styles.heading}>Generate Report</Text>
        <TextInput
          style={styles.input}
          placeholder="Nurse Name"
          value={doctorName}
          onChangeText={setDoctorName}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Write your report here..."
          value={report}
          onChangeText={setReport}
          multiline
          numberOfLines={10}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: windowHeight * 0.04,
    marginLeft: windowWidth * 0.4,
    fontSize: windowWidth * 0.1, // Adjusted fontSize for header text
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    width: windowWidth * 0.96,
    height: windowHeight * 0.8,
    padding: 20,
    borderTopLeftRadius: windowWidth * 0.1,
    borderTopRightRadius: windowWidth * 0.1,
    backgroundColor: 'rgba(1, 147, 134, 0.7)',
    position: 'absolute',
    top: windowHeight * 0.3,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  input: {
    height: windowHeight * 0.07,
    borderColor: 'white',
    borderWidth: 1,
    marginVertical: 10,
    fontSize: windowHeight * 0.02,
    paddingHorizontal: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: 'white',
  },
  textArea: {
    height: windowHeight * 0.3,
    borderColor: 'white',
    borderWidth: 1,
    marginVertical: 10,
    fontSize: windowHeight * 0.02,
    paddingHorizontal: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: 'white',
  },
  button: {
    backgroundColor: 'rgb(161, 190, 104)',
    paddingVertical: windowHeight * 0.02,
    paddingHorizontal: windowWidth * 0.1,
    borderRadius: 20,
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  header: {
    position: 'absolute',
    top: windowHeight * 0.05,
    left: windowWidth * 0.05,
    zIndex: 1,
  },
});

export default GenerateReport;
