import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps, Screens} from '@/navigation/screens';

const SplashScreen = () => {
  const navigation = useNavigation<ScreenProps<Screens.Splash>['navigation']>();

  const handleNavigate = useCallback(() => {
    navigation.navigate(Screens.Tabs);
  }, []);

  return (
    <View>
      <Text>SplashScreen</Text>
      <TouchableOpacity onPress={handleNavigate}>
        <Text style={styles.text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 20,
  },
});

export default SplashScreen;