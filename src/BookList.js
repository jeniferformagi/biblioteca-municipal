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
        // Ajustando maxResults para 40, que é o máximo permitido
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=love&maxResults=40');
        setBooks(response.data.items); // Armazena os livros retornados pela API
      } catch (error) {
        console.error('Erro ao buscar livros:', error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filtragem dos livros com base no texto de entrada
  const filteredBooks = books.filter(book => {
    const title = book.volumeInfo.title.toLowerCase();
    const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ').toLowerCase() : '';
    const categories = book.volumeInfo.categories ? book.volumeInfo.categories.join(', ').toLowerCase() : '';

    return (
      title.includes(filter.toLowerCase()) ||
      author.includes(filter.toLowerCase()) ||
      categories.includes(filter.toLowerCase())
    );
  });

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Filtrar por título, autor ou categoria"
        value={filter}
        onChangeText={setFilter}
      />
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id} // Usando o ID do livro como chave
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