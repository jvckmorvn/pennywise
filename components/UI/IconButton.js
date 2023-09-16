import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({icon, size, colour, onPress}) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => pressed ? styles.pressed : null }>
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={colour}/>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2
  },
  pressed: {
    opacity: 0.8
  }
});
