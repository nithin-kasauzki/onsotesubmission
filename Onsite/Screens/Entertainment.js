import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking } from 'react-native';

const Entertainment = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=3ffc8e8fd11f4b4f82987d0dadbc63e7');
        const data = await response.json();
        setNewsData(data.articles);
      }
      catch {
        console.error('Error fetching data:', error);
      }
    };
    fetchAPI();
  }, []);

  const openURI = async (url) => {
    return Linking.openURL(url);
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.newsContainer}>
          {newsData.map((item, i) => (
            <TouchableOpacity key={i} style={{ padding: 10, marginTop: 15, backgroundColor: "#CDCDCD", borderRadius: 8, }} onPress={() => openURI(item.url)}>
              <Image
                width={319}
                height={200}
                resizeMode={"cover"}
                source={{ uri: item.urlToImage }}
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.publishedAt}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView >
    </SafeAreaView>
  )
};

export default Entertainment

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  touchable: {
    maxWidth: 400,
    padding: 0,
    maxHeight: 40,
  },
  newsContainer: {
    margin: 10,
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "600"
  },
  newsDescription: {
    fontSize: 16,
    marginTop: 10
  },
  date: {
    fontSize: 14
  },
})