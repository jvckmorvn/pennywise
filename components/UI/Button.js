import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

export default function Button({children, onPress, mode, style}) {
  const isFlat = mode === 'flat';

  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
        <View style={[styles.button, isFlat && styles.flat]}>
          <Text style={[styles.buttonText, isFlat && styles.flat]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colours.primary500
  },
  flat: {
    backgroundColor: 'transparent'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  flatText: {
    color: GlobalStyles.colours.primary200
  },
  pressed: {
    opacity: 0.8,
    backgroundColor: GlobalStyles.colours.primary400,
    borderRadius: 4
  }
});
