import {NativeStackScreenProps} from '@react-navigation/native-stack';

enum Screens {
  Splash = 'Splash',
  Tabs = 'Tabs',
  Home = 'Home',
  Category = 'Category',
  IncomeCategory = 'IncomeCategory',
}

type RootStackParamList = {
  [Screens.Splash]: undefined;
  [Screens.Tabs]: undefined;
  [Screens.Home]: undefined;
  [Screens.Category]: undefined;
  [Screens.IncomeCategory]: undefined;
};

type ScreenProps<
  T extends keyof RootStackParamList,
  I extends string | undefined = undefined,
> = NativeStackScreenProps<RootStackParamList, T, I>;

type RouteList = {name: Screens}[];

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
      //
    }
  }
}

export {Screens};

export type {RootStackParamList, RouteList, ScreenProps};
