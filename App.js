import { StyleSheet, SafeAreaView, View, Text, Image, FlatList, Pressable } from "react-native";
import { useSpotifyAuth, millisToMinutesAndSeconds } from "./utils";
import { Themes, Images } from "./assets/Themes";
import Song from "./Song";
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import DetailScreen from './DetailScreen'
import PreviewScreen from './PreviewScreen'

const Stack = createStackNavigator();

const renderSong = ({ item }, navigation) => { 
  return (
      <Song
        external = {item.external_urls.spotify}
        preview = {item.preview_url}
        songImage={item.album.images[0].url}
        title={item.name}
        artist={item.artists[0].name}
        album={item.album.name}
        duration={millisToMinutesAndSeconds(item.duration_ms)}
        navigation = {navigation}
      />
  );
};

function MainScreen({ navigation }) {
  let contentDisplay = null;
  const { token, tracks, getSpotifyAuth } = useSpotifyAuth(true);
  // console.log(tracks);

  if (token) {
    contentDisplay =
        <View style={{ width: '100%' }}>
          <View style={styles.header}>
            <Image
              source={Images.spotify} style={{ height: 30, width: 30 }} />
            <Text style={{ fontSize: 20, color: "white" }}> My Top Tracks</Text>
          </View>
          <View>
            <FlatList
              data={tracks}
              renderItem={(params) => renderSong(params, navigation)}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>

  } else {
    contentDisplay =
      <View style={styles.WelcomeButton}>
        <Image style={{ height: 45, width: 45 }}
          source={Images.spotify} />
        <Pressable onPress={getSpotifyAuth}>
          <Text> CONNECT WITH SPOTIFY!</Text>
        </Pressable>
      </View>
  }

  return (
    <SafeAreaView style={styles.container}>
      {contentDisplay}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Spotify" component={MainScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="Song Details" component={DetailScreen} />
        <Stack.Screen name="Song Preview" component={PreviewScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  WelcomeButton: {
    backgroundColor: Themes.colors.spotify,
    flexDirection: "row",
    borderRadius: 99999,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 10,
  }
});


