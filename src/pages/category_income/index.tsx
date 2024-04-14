import React, {useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Modal,
} from 'react-native';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Swipeable} from 'react-native-gesture-handler';
import {ScreenProps, Screens} from '@/navigation/screens';

const Income_Category = () => {
  const navigation =
    useNavigation<ScreenProps<Screens.IncomeCategory>['navigation']>();

  const [searchText, setSearchText] = useState('');
  const handleClear = () => {
    setSearchText('');
  };
  const rightSwipe = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <TouchableOpacity
            onPress={() => console.log('Edit pressed')}
            style={{
              width: 61,
              height: 61,
              backgroundColor: '#4960F9',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
            }}>
            <Icon name="edit" size={25} color={'#FFFFFF'}></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Delete pressed')}
            style={{
              width: 61,
              height: 61,
              backgroundColor: '#F1D6C7',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
            }}>
            <Icon name="delete" size={25} color={'#F54337'}></Icon>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View>
        <View>
          <StatusBar backgroundColor={'#4960F9'}></StatusBar>
        </View>
        <View style={styles.section_1}>
          <View style={styles.header}>
            {/* <View>
              <Image
                source={require('../../assets/images/')}
                style={styles.imageStyle}
              />
            </View> */}
            <View
              style={{
                backgroundColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'center',
                width: 190,
                borderRadius: 15,
              }}>
              <View style={styles.btn}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(Screens.Category)}>
                  <Text style={{color: '#171717'}}>Chi phí</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.btn, {backgroundColor: '#1732e0'}]}>
                <TouchableOpacity>
                  <Text style={{color: '#ffffff'}}>Thu nhập</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
            <Text style={{color: '#87F0FF', fontWeight: '300', fontSize: 22}}>
              Tổng thu nhập của bạn
            </Text>
            <Text style={{color: '#FFF', fontWeight: '400', fontSize: 28}}>
              25,000,000 đ
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <Text>Theo dõi hạng mục thu nhập</Text>
          <View style={styles.search}>
            <Icon name={'search1'} size={20} />
            <View
              style={{
                flex: 1,
                marginLeft: 12,
                borderBottomWidth: 1,
                borderBottomColor: '#F54337',
              }}>
              <TextInput
                placeholder="Search"
                value={searchText}
                onChangeText={value => setSearchText(value)}></TextInput>
            </View>
            <TouchableOpacity onPress={handleClear}>
              <Icon name={'close'} size={20} style={{marginLeft: 20}} />
            </TouchableOpacity>
          </View>
          <View style={styles.list}>
            <View style={styles.item}>
              <Image source={require('../../assets/images/6.jpg')}></Image>
              <Text style={{flex: 1, marginLeft: 10}}>Thu nhập</Text>
              <View>
                <Image
                  source={require('../../assets/images/rectangle.png')}
                  style={{
                    position: 'absolute',
                    top: -18,
                    right: -3,
                    width: 163,
                    height: 61,
                  }}></Image>
                <View
                  style={{
                    backgroundColor: 'transparent',
                    marginRight: 10,
                  }}>
                  <Text>3,000,000 đ</Text>
                </View>
              </View>
            </View>
            <Swipeable renderRightActions={rightSwipe} key={1}>
              <View style={styles.item}>
                <Image
                  source={require('../../assets/images/trang.jpg')}></Image>
                <Text style={{flex: 1, marginLeft: 10}}>Tài chính</Text>
                <View>
                  <Image
                    source={require('../../assets/images/rectangle.png')}
                    style={{
                      position: 'absolute',
                      top: -18,
                      right: -3,
                      width: 163,
                      height: 61,
                    }}></Image>
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      marginRight: 10,
                    }}>
                    <Text>20,000,000 đ</Text>
                  </View>
                </View>
              </View>
            </Swipeable>
            <View style={styles.item}>
              <Image source={require('../../assets/images/trang.jpg')}></Image>
              <Text style={{flex: 1, marginLeft: 10}}>Tiết kiệm</Text>
              <View>
                <Image
                  source={require('../../assets/images/rectangle.png')}
                  style={{
                    position: 'absolute',
                    top: -18,
                    right: -3,
                    width: 163,
                    height: 61,
                  }}></Image>
                <View
                  style={{
                    backgroundColor: 'transparent',
                    marginRight: 10,
                  }}>
                  <Text>5,000,000 đ</Text>
                </View>
              </View>
            </View>
            <View style={styles.item}>
              <Image source={require('../../assets/images/trang.jpg')}></Image>
              <Text style={{flex: 1, marginLeft: 10}}>Khác</Text>
              <View>
                <Image
                  source={require('../../assets/images/rectangle.png')}
                  style={{
                    position: 'absolute',
                    top: -18,
                    right: -3,
                    width: 163,
                    height: 61,
                  }}></Image>
                <View
                  style={{
                    backgroundColor: 'transparent',
                    marginRight: 10,
                  }}>
                  <Text>0 đ</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.add}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="pluscircle" size={50} color={'#4CB050'}></Icon>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 90,
                  width: 330,
                  backgroundColor: '#4CB050',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <Text style={{color: '#fff', fontSize: 18, fontWeight: 400}}>
                  Mục nhỏ mới
                </Text>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 250,
                    height: 40,
                    marginVertical: 20,
                  }}>
                  <Text style={{fontSize: 16}}>Tên:</Text>
                  <TextInput
                    placeholder=""
                    style={{
                      height: 40,
                      borderBottomWidth: 1,
                      borderColor: '#CFCFCF',
                      marginLeft: 25,
                      flex: 1,
                    }}></TextInput>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 170,
                    height: 40,
                    justifyContent: 'space-between',
                    marginBottom: 20,
                  }}>
                  <Text style={{fontSize: 16}}>Ảnh:</Text>
                  <Image
                    source={require('../../assets/images/trang.jpg')}></Image>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 20}}>
                <Image
                  source={require('../../assets/images/cam.jpg')}
                  style={{
                    width: 57,
                    height: 57,
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}></Image>
                <Image
                  source={require('../../assets/images/cam.jpg')}
                  style={{
                    width: 57,
                    height: 57,
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}></Image>
                <Image
                  source={require('../../assets/images/cam.jpg')}
                  style={{
                    width: 57,
                    height: 57,
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}></Image>
                <Image
                  source={require('../../assets/images/cam.jpg')}
                  style={{
                    width: 57,
                    height: 57,
                    marginHorizontal: 10,
                    marginVertical: 10,
                  }}></Image>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  marginVertical: 40,
                  gap: 10,
                }}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    width: 135,
                    height: 63,
                    backgroundColor: '#C4C5CD',
                    borderRadius: 20,
                    // marginHorizontal: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: '#5F5F5F', fontSize: 16, fontWeight: 400}}>
                    HỦY
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    width: 135,
                    height: 63,
                    borderRadius: 20,
                    backgroundColor: '#4CB050',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff', fontSize: 16, fontWeight: 400}}>
                    LƯU LẠI
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  section_1: {
    backgroundColor: '#4960F9',
    height: 229,
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    paddingBottom: 20,
  },

  header: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  btn: {
    width: 95,
    height: 30,
    overflow: 'hidden',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    flexDirection: 'row',
    marginVertical: 2,
    alignItems: 'center',
    height: 40,
  },
  list: {
    marginVertical: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 310,
    height: 61,
    borderWidth: 1,
    borderColor: '#dbdaed',
    borderRadius: 12,
    backgroundColor: '#F7F8FC',
    marginVertical: 3,
    paddingLeft: 8,
  },
  add: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
});
export default Income_Category;
