import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const BookDetail = ({ route }) => {
  const { book } = route.params; // Recebe o livro passado como parâmetro

  return (
    <ScrollView style={styles.container}>
      {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
        <Image
          source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
          style={styles.cover}
        />
      )}
      <Text style={styles.title}>{book.volumeInfo.title}</Text>
      <Text style={styles.author}>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Autor desconhecido'}</Text>
      <Text style={styles.category}>
        {book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Sem categoria'}
      </Text>
      <Text style={styles.summary}>
        {book.volumeInfo.description ? book.volumeInfo.description : 'Sem resumo disponível.'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cover: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  author: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  category: {
    color: 'gray',
    marginBottom: 10,
  },
  summary: {
    marginTop: 10,
  },
});

export default BookDetail;