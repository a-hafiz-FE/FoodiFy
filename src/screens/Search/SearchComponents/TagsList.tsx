import React from 'react';
import { View, FlatList } from 'react-native';
import { styles } from '../styles';
import TagCard from '../../../Components/TagCard';

const data = [
  { id: '1', tag: '#egg' },
  { id: '2', tag: '#chicken' },
  { id: '3', tag: '#pasta' },
  { id: '4', tag: '#salad' },
  { id: '5', tag: '#vegan' },
  { id: '6', tag: '#breakfast' },
  { id: '7', tag: '#dessert' },
  { id: '8', tag: '#spicy' },
  { id: '9', tag: '#quick' },
  { id: '10', tag: '#healthy' },
  { id: '11', tag: '#seafood' },
  { id: '12', tag: '#rice' },
  { id: '13', tag: '#soup' },
  { id: '14', tag: '#grill' },
  { id: '15', tag: '#snack' },
  { id: '16', tag: '#keto' },
  { id: '17', tag: '#lowcarb' },
  { id: '18', tag: '#italian' },
  { id: '19', tag: '#asian' },
  { id: '20', tag: '#middleeastern' },
];

const TagsList = () => {
  return (
    <View style={styles.ChefsListStyle}>
      <FlatList
        data={data}
        renderItem={tag => <TagCard />}
        keyExtractor={tag => tag.id}
        ItemSeparatorComponent={() => <View style={{ height: 17 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TagsList;
