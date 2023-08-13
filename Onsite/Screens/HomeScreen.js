import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking } from 'react-native';
// import Share from 'react-native-share'

const HomeScreen = () => {
  const [newsData, setNewsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }
  }

  // const myCustomShare = async () => {
  //   const shareOptions = {
  //     message: 'This is a test message',
  //   }
  //   try {
  //     const ShareResponse = await Share.open(shareOptions);
  //   }
  //   catch (error) {
  //     console.log('Error => ', error)
  //   }
  // }


  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=3ffc8e8fd11f4b4f82987d0dadbc63e7')
          .then(setIsLoading(false));
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

  const search = async (value) => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${value}&apiKey=3ffc8e8fd11f4b4f82987d0dadbc63e7`)
      const data = await response.json();
      setNewsData(data.articles);
    }
    catch {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style>
          <TextInput
            placeholder="Search News"
            onChangeText={search}
            value={searchQuery}
            onClear={() => search('')}
            placeholderTextColor={"black"}
            style={[styles.textInput, { padding: 10, width: '100%' }]} >
          </TextInput>
        </View>
        <View style={styles.newsContainer}>
          {newsData.map((item, i) => (
            <TouchableOpacity key={i} style={{ padding: 10, marginTop: 15, backgroundColor: "#CDCDCD", borderRadius: 8 }} onPress={() => openURI(item.url)}>
              <Image
                width={319}
                height={200}
                resizeMode={"cover"}
                source={{ uri: item.urlToImage }}
              />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{item.publishedAt}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
              {/* <Button onPress={{ myCustomShare }} /> */}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView >
    </SafeAreaView>
  )
};

export default HomeScreen

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
  textInput: {
    color: 'black',
  },
})