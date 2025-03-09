import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const BookItem = ({ book }) => {
  // Função para limitar o texto a 300 caracteres
  const limitText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };

  return (
    <View style={styles.container}>
      {book.cover_id && (
        <Image
          source={{ uri: `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg` }}
          style={styles.cover}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author_name ? book.author_name.join(', ') : 'Autor desconhecido'}</Text>
        <Text style={styles.category}>
          {book.subject ? limitText(book.subject.join(', '), 300) : 'Sem categoria'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Alinha a imagem e o texto lado a lado
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  cover: {
    width: 100,
    height: 150,
    marginRight: 10, // Espaço entre a capa e o texto
  },
  textContainer: {
    flex: 1, // Permite que o texto ocupe o espaço restante
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  author: {
    fontStyle: 'italic',
  },
  category: {
    color: 'gray',
  },
});

export default BookItem;