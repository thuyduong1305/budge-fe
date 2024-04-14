import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  Modal,
  Button,
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Image} from 'react-native';
import {get} from '@/utils/request.js';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

const HistoryScreen = () => {
  const imageLink = [
    require('../../assets/images/1.jpg'),
    require('../../assets/images/2.jpg'),
    require('../../assets/images/3.jpg'),
    require('../../assets/images/4.jpg'),
    require('../../assets/images/5.jpg'),
    require('../../assets/images/6.jpg'),
    require('../../assets/images/7.jpg'),
  ];
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const handleSearchBlur = () => {
    const lowerCaseSearchText = searchText.toLowerCase();
    const filteredData = data.filter(
      item =>
        item.name.toLowerCase().includes(lowerCaseSearchText) ||
        item.date.toLowerCase().includes(lowerCaseSearchText) ||
        item.money.toLowerCase().includes(lowerCaseSearchText),
    );
    setData(filteredData);
  };
  const handleNameFilter = value => {
    setSelectCategory(value);
    const filteredData = data.filter(item => item.name === selectCategory);
    setData(filteredData);
    setShowList(false);
  };
  const handleClear = () => {
    setSearchText('');
    getAPi();
  };
  const [modalSort, setModalSort] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [selectDate, setSelectDate] = useState(false);
  const [selectDateFilter, setSelectDateFilter] = useState(false);
  const [selectMoney, setSelectMoney] = useState(false);
  const [minMoney, setMinMoney] = useState('');
  const [maxMoney, setMaxMoney] = useState('');
  const [showList, setShowList] = useState(false);
  const [selectCategory, setSelectCategory] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [sortByDateAscending, setSortByDateAscending] = useState(true);
  const [sortByAmountAscending, setSortByAmountAscending] = useState(true);
  const filterDataByMoneyRange = () => {
    setSelectMoney(false);
    const min = parseFloat(minMoney);
    const max = parseFloat(maxMoney);

    const filtered = data.filter(item => {
      const money = parseFloat(item.money);
      return money >= min && money <= max;
    });

    setData(filtered);
  };
  const toggleSortByDate = () => {
    setSortByDateAscending(!sortByDateAscending);
  };

  const sortByDate = ascending => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return ascending ? dateA - dateB : dateB - dateA;
    });
    setData(sortedData);
  };
  // const handleSelectStartDate = date => {
  //   setStartDate(date);
  // };

  // const handleSelectEndDate = date => {
  //   setEndDate(date);
  // };
  const filterData = (start, end) => {
    const filteredData = data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= start && itemDate <= end;
    });

    setData(filteredData);
  };
  const toggleSortByAmount = () => {
    setSortByAmountAscending(!sortByAmountAscending);
  };

  const sortByAmount = ascending => {
    const sortedData = [...data].sort((a, b) => {
      return ascending ? b.money - a.money : a.money - b.money;
    });
    setData(sortedData);
  };
  const getAPi = async () => {
    try {
      let response = await get('payment_history');
      let list = [];
      list = response.data;
      list.reverse();
      setData(list);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAPi();
  }, []);
  return (
    <>
      <ScrollView>
        <View style={{marginHorizontal: 20}}>
          <View style={styles.search}>
            <Icon name={'search1'} size={20} />
            <View
              style={{
                flex: 1,
                marginLeft: 12,
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
          <View style={styles.filter}>
            <Text style={{fontSize: 22, fontWeight: 700, color: '#3A3A3A'}}>
              Giao dịch gần đây
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: 45,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => setModalSort(true)}>
                <Ionicons
                  name="swap-vertical"
                  size={20}
                  color={'#244FE6'}></Ionicons>
              </TouchableOpacity>
              <Modal
                animationType="none"
                transparent={true}
                visible={modalSort}
                onRequestClose={() => {
                  setModalSort(false);
                }}>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPressOut={() => {
                    setModalSort(false);
                  }}>
                  <View
                    style={{
                      width: 130,
                      flexDirection: 'column',
                      position: 'absolute',
                      right: 20,
                      top: 90,
                      borderRadius: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        toggleSortByDate();
                        sortByDate(sortByDateAscending);
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          alignItems: 'center',
                          flexDirection: 'row',
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        <Icon name="calendar" size={24}></Icon>
                        <Text style={{marginHorizontal: 10}}>Ngày</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        toggleSortByAmount();
                        sortByAmount(sortByAmountAscending);
                      }}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          alignItems: 'center',
                          flexDirection: 'row',
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        <FontAwesome6
                          name="money-bills"
                          size={20}></FontAwesome6>
                        <Text style={{marginHorizontal: 10}}>Số tiền</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>

              <TouchableOpacity onPress={() => setModalFilter(true)}>
                <Icon name="filter" size={20} color={'#244FE6'}></Icon>
              </TouchableOpacity>
              <Modal
                animationType="none"
                transparent={true}
                visible={modalFilter}
                onRequestClose={() => {
                  setModalFilter(false);
                }}
                style={{backgroundColor: 'white'}}>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPressOut={() => {
                    setModalFilter(false);
                  }}>
                  <View
                    style={{
                      width: 130,
                      flexDirection: 'column',
                      position: 'absolute',
                      right: 20,
                      top: 90,
                      borderRadius: 10,
                    }}>
                    <TouchableOpacity onPress={() => setSelectDateFilter(true)}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          alignItems: 'center',
                          flexDirection: 'row',
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        <Icon name="calendar" size={24}></Icon>
                        <Text style={{marginHorizontal: 10}}>Ngày</Text>
                      </View>
                      <Modal
                        visible={selectDateFilter}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setSelectDateFilter(false)}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          }}>
                          <View style={{backgroundColor: 'white', padding: 20}}>
                            <Text>Ngày bắt đầu</Text>
                            <DatePicker
                              date={startDate}
                              onDateChange={date => setStartDate(date)}
                              title="Ngày bắt đầu"
                            />
                            <Text>Ngày kết thúc</Text>
                            <DatePicker
                              date={endDate}
                              onDateChange={date => setEndDate(date)}
                            />
                            <Button
                              title="Xác nhận"
                              onPress={() => {
                                filterData(startDate, endDate);
                                setSelectDateFilter(false);
                              }}
                            />
                          </View>
                        </View>
                      </Modal>
                      {/* {selectDate && (
                        <View
                          style={{
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => setSelectDateFilter(true)}>
                            <View
                              style={{
                                backgroundColor: 'white',
                                alignItems: 'center',
                                flexDirection: 'row',

                                paddingHorizontal: 10,
                                paddingVertical: 5,
                              }}>
                              <Text style={{marginHorizontal: 10}}>
                                Bắt đầu
                              </Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <View
                              style={{
                                backgroundColor: 'white',
                                alignItems: 'center',
                                flexDirection: 'row',

                                paddingHorizontal: 10,
                                paddingVertical: 5,
                              }}>
                              <Text style={{marginHorizontal: 10}}>
                                Kết thúc
                              </Text>
                            </View>
                          </TouchableOpacity>
                          
                        </View>
                      )} */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowList(true)}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        <Icon name="database" size={23}></Icon>
                        <Text style={{marginHorizontal: 10}}>Danh mục</Text>
                      </View>
                    </TouchableOpacity>
                    {showList && (
                      <FlatList
                        data={data}
                        renderItem={({item}) => (
                          <TouchableOpacity
                            onPress={() => handleNameFilter(item.name)}>
                            <View
                              style={{
                                backgroundColor: 'white',
                                padding: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ccc',
                              }}>
                              <Text>{item.name}</Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                    <TouchableOpacity onPress={() => setSelectMoney(true)}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          alignItems: 'center',
                          flexDirection: 'row',
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                        }}>
                        <FontAwesome6
                          name="money-bills"
                          size={20}></FontAwesome6>
                        <Text style={{marginHorizontal: 10}}>Số tiền</Text>
                      </View>
                      {selectMoney && (
                        <View style={{backgroundColor: 'white'}}>
                          <View
                            style={{
                              backgroundColor: 'white',
                              alignItems: 'center',
                              flexDirection: 'row',
                              paddingHorizontal: 10,
                            }}>
                            <Text style={{marginHorizontal: 5}}>Từ</Text>
                            <TextInput
                              onChangeText={value => setMinMoney(value)}
                              style={{
                                flex: 1,
                                borderBottomColor: '#615252',
                                borderBottomWidth: 1,
                                marginLeft: 13,
                              }}></TextInput>
                          </View>
                          <View
                            style={{
                              backgroundColor: 'white',
                              alignItems: 'center',
                              flexDirection: 'row',
                              paddingHorizontal: 10,
                              marginBottom: 5,
                            }}>
                            <Text style={{marginHorizontal: 5}}>Đến</Text>
                            <TextInput
                              onChangeText={value => setMaxMoney(value)}
                              onBlur={filterDataByMoneyRange}
                              style={{
                                flex: 1,
                                borderBottomColor: '#615252',
                                borderBottomWidth: 1,
                              }}></TextInput>
                          </View>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
            </View>
          </View>
          <SafeAreaView style={styles.list}>
            <FlatList
              scrollEnabled={false}
              data={data}
              renderItem={({item}) => {
                const imagePath = imageLink[parseInt(item.image)];
                return (
                  <View style={styles.item}>
                    <Image
                      style={{
                        marginRight: 8,
                        borderRadius: 50,
                        width: 57,
                        height: 57,
                      }}
                      source={imagePath}></Image>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flex: 1,
                        marginRight: 20,
                      }}>
                      <View style={styles.dess}>
                        <Text style={styles.category}>{item.name}</Text>
                        <Text style={styles.date}>
                          {moment(item.date).format('YYYY-MM-DD, HH:mm')}
                        </Text>
                      </View>
                      <Text style={styles.amount}>
                        {item.money
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
                      </Text>
                    </View>
                  </View>
                );
              }}></FlatList>
          </SafeAreaView>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
    height: 40,
    backgroundColor: '#dee0ea',
    borderRadius: 16,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list: {
    // height: '80%',
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  dess: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 14,
    fontWeight: 200,
    color: '#4b4141',
  },
  date: {
    color: '#7a88e8',
    fontSize: 12,
    fontWeight: 400,
  },
  amount: {
    color: '#cf827d',
    fontSize: 12,
  },
});

export default HistoryScreen;
