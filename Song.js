import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';



const Song = ({ external, preview, songImage, title, artist, album, duration, navigation }) => {
  return (
    <View style={styles.track}>
      <Pressable 
        onPress={() => navigation.navigate("Song Preview", {preview}
        )}>
        <Ionicons name="play-circle" size={24} color="green"  />
      </Pressable>
      <Pressable style={styles.trackInfo} onPress={() => navigation.navigate("Song Details", {external}   
        )}>
        <Image style={styles.image}
          source={{ uri: songImage }} />
        <View style={styles.titleAndArtist}>
          <Text style={{ color: "white" }}
            numberOfLines={1} > {title} </Text>
          <Text style={{ color: "gray" }}> {artist} </Text>
        </View>
        <Text style={{ color: "white", width: "25%" }}
          numberOfLines={1}> {album}</Text>
        <Text style={{ color: "white", width: "15%" }}> {duration} </Text>
      </Pressable>
    </View >

  )
};

export default Song;

const styles = StyleSheet.create({
  track: {
    alignItems: "center",
    flexDirection: "row",
    width: '100%',
    height: undefined
  },

  image: {
    width: "20%",
    height: 70,
    justifyContent: "center",
    margin: 5
  },

  trackInfo: {
    flexDirection: 'row',
  },

  titleAndArtist: {
    flexDirection: "column",
    //margin: 10,
    width: '30%'
  }
});
