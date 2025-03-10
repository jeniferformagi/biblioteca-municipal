import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import BookItem from './BookItem';

const BookList = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:biography&maxResults=40&orderBy=newest');
        setBooks(response.data.items);
      } catch (error) {
        console.error('Erro ao buscar livros:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    const title = book.volumeInfo.title || '';
    const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : '';
    const categories = book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : '';
    const description = book.volumeInfo.description || '';
    const imageLinks = book.volumeInfo.imageLinks;
    const hasEssentialInfo = title && author && categories.length > 0 && description && imageLinks && imageLinks.thumbnail;
    const containsExcludedTerms = title.toLowerCase().includes('trip') || title.toLowerCase().includes('placar') || title.toLowerCase().includes('lua');

    return hasEssentialInfo && !containsExcludedTerms && (
      title.toLowerCase().includes(filter.toLowerCase()) ||
      categories.toLowerCase().includes(filter.toLowerCase())
    );
  });

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Filtrar por título, autor ou categoria"
        value={filter}
        onChangeText={setFilter}
      />
      <FlatList
        data={filteredBooks}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { book: item })}>
            <BookItem book={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default BookList;