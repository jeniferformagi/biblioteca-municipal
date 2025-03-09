import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import BookItem from './BookItem';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://openlibrary.org/subjects/love.json?limit=200');
        setBooks(response.data.works);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => {
    const title = book.title.toLowerCase();
    const author = book.author_name ? book.author_name.join(', ').toLowerCase() : '';
    return title.includes(filter.toLowerCase()) || author.includes(filter.toLowerCase());
  });

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Filtrar por título ou autor"
        value={filter}
        onChangeText={setFilter}
      />
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <BookItem book={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default BookList;