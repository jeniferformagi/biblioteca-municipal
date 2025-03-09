import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import BookList from './src/BookList';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <BookList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
