import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Modal,
  Alert,
} from 'react-native';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {FlatList, ScrollView, Swipeable} from 'react-native-gesture-handler';
import axios from 'axios';
import {get, post, patch, del} from '@/utils/request.js';
import { ScreenProps, Screens } from '@/navigation/screens';

const Category = () => {
  const navigation = useNavigation<ScreenProps<Screens.Category>['navigation']>();

  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [itemEdit, setItemEdit] = useState('');

  const imageLink = [
    require('../../assets/images/1.jpg'),
    require('../../assets/images/2.jpg'),
    require('../../assets/images/3.jpg'),
    require('../../assets/images/4.jpg'),
    require('../../assets/images/5.jpg'),
    require('../../assets/images/6.jpg'),
    require('../../assets/images/7.jpg'),
  ];
  const handleSearchBlur = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(lowerCaseSearchText),
    );
    setData(filteredData);
  };
  const handleClear = () => {
    setSearchText('');
    getAPi();
  };
  const handleEdit = async id => {
    setEditMode(true);
    console.log(id);
    const amount = await get(`amount/${id}`);
    setItemEdit(amount.data);
    console.log(itemEdit);
    setModalVisible(true);
  };
  const onSubmitEditMode = async () => {
    setModalVisible(false);
    let formData = {
      id: itemEdit._id,
      name: name,
      image: image,
    };
    formData.name = name ? name : itemEdit.name;
    formData.image = image ? image : itemEdit.image;
    try {
      // console.log(formData);
      await patch('amount', formData);
      setEditMode(false);
      setName('');
      setImage('');
      getAPi();
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu:', error);
    }
  };
  const handleDeleteItem = async id => {
    await del(`amount/${id}`);
    getAPi();
  };
  const openDeleteAlert = id => {
    Alert.alert('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa hạng mục này?', [
      {
        text: 'HỦY',
        style: 'cancel',
      },
      {
        text: 'XÓA',
        onPress: () => handleDeleteItem(id), // Gọi hàm xử lý xóa khi người dùng nhấn Delete
        style: 'destructive',
      },
    ]);
  };

  const rightSwipe = itemId => {
    // console.log(itemId);
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <View>
            <TouchableOpacity
              onPress={() => handleEdit(itemId)}
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
          </View>
          <TouchableOpacity
            onPress={() => openDeleteAlert(itemId)}
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

  // console.log(typeof data);
  const getAPi = async () => {
    try {
      let response = await get('amount');
      let list = [];
      list = response.data;
      list.reverse();
      setData(list);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async () => {
    setModalVisible(false);
    let formdata = {
      name: name,
      image: image,
    };
    // if (editMode) {
    //   const formedit = {id, ...formdata};
    //   console.log(formedit);
    //   // await patch('amount', formedit);
    //   setEditMode(false);
    // } else {
    //   await post('amount', formdata);
    // }
    await post('amount', formdata);
    setName('');
    setImage('');
    getAPi();
  };
  useEffect(() => {
    getAPi();
  }, []);
  // const index = 1;
  // const dynamicImage = require('../../assets/images/1.jpg');
  return (
    <>
      <ScrollView>
        <View>
          <View>
            <StatusBar backgroundColor={'#4960F9'}></StatusBar>
          </View>
          <View style={styles.section_1}>
            <View style={styles.header}>
              <View
                style={{
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: 190,
                  borderRadius: 15,
                }}>
                <View style={[styles.btn, {backgroundColor: '#1732e0'}]}>
                  <TouchableOpacity>
                    <Text style={{color: '#FFFFFF'}}>Chi phí</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(Screens.IncomeCategory)}>
                    <Text style={{color: '#171717'}}>Thu nhập</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
                flex: 1,
              }}>
              <Text style={{color: '#87F0FF', fontWeight: '300', fontSize: 22}}>
                Tổng chi phí của bạn
              </Text>
              <Text style={{color: '#FFF', fontWeight: '400', fontSize: 28}}>
                15,000,000 đ
              </Text>
            </View>
          </View>
          <View style={{marginHorizontal: 20, marginVertical: 10}}>
            <Text>Theo dõi hạng mục chi phí</Text>
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
                  onChangeText={value => setSearchText(value)}
                  onBlur={handleSearchBlur}></TextInput>
              </View>
              <TouchableOpacity onPress={handleClear}>
                <Icon name={'close'} size={20} style={{marginLeft: 20}} />
              </TouchableOpacity>
            </View>
            <View style={styles.list}>
              <FlatList
                scrollEnabled={false}
                data={data}
                renderItem={({item}) => (
                  <Swipeable
                    renderRightActions={() => rightSwipe(item._id)}
                    key={item._id}>
                    <View style={styles.item}>
                      <Image
                        style={{width: 57, height: 57}}
                        source={item.image}></Image>
                      <Text
                        style={{
                          flex: 1,
                          marginLeft: 10,
                          marginRight: 65,
                          fontSize: 12,
                        }}>
                        {item.name}
                      </Text>
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
                  </Swipeable>
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.add}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="pluscircle" size={50} color={'#F54337'}></Icon>
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
                  backgroundColor: '#F54337',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <Text style={{color: '#fff', fontSize: 18, fontWeight: 400}}>
                  Hạng mục
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
                    onChangeText={value => setName(value)}
                    placeholder=""
                    style={{
                      height: 40,
                      borderBottomWidth: 1,
                      borderColor: '#CFCFCF',
                      marginLeft: 25,
                      flex: 1,
                    }}>
                    {editMode ? itemEdit.name : ''}
                  </TextInput>
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
                    style={{width: 57, height: 57}}
                    source={
                      editMode
                        ? itemEdit?.image
                        : require('../../assets/images/cam.jpg')
                    }></Image>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 20,
                  width: 330,
                  flexWrap: 'wrap',
                }}>
                {imageLink.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => setImage(item)}>
                    <Image
                      source={item}
                      style={{
                        width: 57,
                        height: 57,
                        marginHorizontal: 10,
                        marginVertical: 10,
                      }}></Image>
                  </TouchableOpacity>
                ))}
              </View>
              <View
                style={{
                  flexDirection: 'row',
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
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{color: '#5F5F5F', fontSize: 16, fontWeight: 400}}>
                    HỦY
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={editMode ? onSubmitEditMode : onSubmit}
                  style={{
                    width: 135,
                    height: 63,
                    borderRadius: 20,
                    backgroundColor: '#F54337',
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
export default Category;
