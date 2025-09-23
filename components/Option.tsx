import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface OptionProps {
  label: string;
  onPress: () => void;
}

export default function Option({ label, onPress }: OptionProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 8
  },
  text: { color: '#fff', fontSize: 16, textAlign: 'center' }
});
