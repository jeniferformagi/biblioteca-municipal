import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const BookItem = ({ book }) => {
  const limitText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };

  return (
    <View style={styles.container}>
      {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
        <Image
          source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
          style={styles.cover}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{book.volumeInfo.title}</Text>
        <Text style={styles.author}>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Autor desconhecido'}</Text>
        <Text style={styles.category}>
          {book.volumeInfo.categories ? limitText(book.volumeInfo.categories.join(', '), 300) : 'Sem categoria'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cover: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
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