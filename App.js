import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,FlatList,TextInput,SafeAreaView } from 'react-native';
import { AntDesign,Entypo,MaterialIcons, EvilIcons,MaterialCommunityIcons,Fontisto  } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
    <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <View style={styles.settings}>
         <Entypo name="chevron-small-left" size={40} color="white" />
         <MaterialIcons name="search" size={40} color="white"/>
        <AntDesign name="bars" size={40} color="white" />
        </View>
       
        <View style={styles.post}>
          <View style={styles.profile}>
           <Image style={styles.image}
           source={require('./assets/Tebtpic.JPG')} />
           <Text> Edward Tebello<br/> July 12 at 17:51</Text>
           <AntDesign name="ellipsis1" size={40} color="white" />
          </View>
          <Text style={styles.postText}>
         Love him for no reason, you will be blessed for ever<br/>
           <Text style={styles.link}>#ExplorerTech</Text>
          </Text>
          <Image style={styles.postpic}
          source={require('./assets/Tebtpic.JPG')} />
          <View style={styles.likecommentshare}>
             <EvilIcons name="like" size={23} color="black" />
             <MaterialCommunityIcons name="comment" size={25} color="black" />
             <Fontisto name="share" size={23} color="black" />
          </View>
        </View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  post:{
    height: 600,
    backgroundColor:'#f5f5f5',
    alignItems:'center',
    justifyContent:'center',
    margin: 12,
  },
  settings:{
    height:70,
    backgroundColor:'blue',
    margin: 12,
   justifyContent: 'space-between',
   flexDirection: 'row',
  },
  postText:{
    color:'black',
    fontSize:15,
    fontWeight:'regular',
    margin:10,
  },
  link:{
    color:'blue',
    fontSize: 15,
    fontWeight:'bold',
  },
  image:{
    width: 50,
    height: 50,
    borderRadius:80,
      },
  postpic:{
    height:300,
    width: 300,
    marginTop:5,
  },
  profile:{
    height: 100,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
  },
  likecommentshare:{
    backgroundColor:'white',
    margin: 12,
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems:'center',
   width:300,
   height:40,
  }
});
