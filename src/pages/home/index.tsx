import {View, Text, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps, Screens} from '@/navigation/screens';

const HomeScreen = () => {
  const navigation = useNavigation<ScreenProps<Screens.Home>['navigation']>();

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Category"
        onPress={() => navigation.navigate(Screens.Category)}
      />
    </View>
  );
};

export default HomeScreen;
