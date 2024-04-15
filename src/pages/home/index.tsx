import {View, Text, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps, Screens} from '@/navigation/screens';

const HomeScreen = () => {
  const navigation = useNavigation<ScreenProps<Screens.Home>['navigation']>();

  return (
    <View>
      <Button
        title="Quản lý hạng mục"
        onPress={() => navigation.navigate(Screens.Category)}
      />
    </View>
  );
};

export default HomeScreen;
