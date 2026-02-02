import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from '../styles';
import ChefCard from '../../../Components/ChefCard';

const data = [
  {
    id: '1',
    image: 'https://picsum.photos/seed/chef1/300/300',
    name: 'Chef Sara',
  },
  {
    id: '2',
    image: 'https://picsum.photos/seed/chef2/300/300',
    name: 'Chef Omar',
  },
  {
    id: '3',
    image: 'https://picsum.photos/seed/chef3/300/300',
    name: 'Chef Noura',
  },
  {
    id: '4',
    image: 'https://picsum.photos/seed/chef4/300/300',
    name: 'Chef Khalid',
  },
  {
    id: '5',
    image: 'https://picsum.photos/seed/chef5/300/300',
    name: 'Chef Lina',
  },
  {
    id: '6',
    image: 'https://picsum.photos/seed/chef6/300/300',
    name: 'Chef Hassan',
  },
  {
    id: '7',
    image: 'https://picsum.photos/seed/chef7/300/300',
    name: 'Chef Aisha',
  },
  {
    id: '8',
    image: 'https://picsum.photos/seed/chef8/300/300',
    name: 'Chef Fahad',
  },
  {
    id: '9',
    image: 'https://picsum.photos/seed/chef9/300/300',
    name: 'Chef Maha',
  },
  {
    id: '10',
    image: 'https://picsum.photos/seed/chef10/300/300',
    name: 'Chef Yousef',
  },
];

const ChefsList = () => {
  return (
    <View style={styles.ChefsListStyle}>
      <FlatList
        data={data}
        renderItem={chef => <ChefCard />}
        keyExtractor={chef => chef.id}
        ItemSeparatorComponent={() => <View style={{ height: 17 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ChefsList;
