import React, { useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { styles } from '../styles';
import ChefCard from '../../../Components/ChefCard';
import { useMealStore } from '../../../app/mealStore';

const ChefsList = () => {
  const chefsById = useMealStore(s => s.chefsById);
  const chefs = useMemo(() => Object.values(chefsById), [chefsById]);

  return (
    <View style={styles.ChefsListStyle}>
      <FlatList
        data={chefs}
        renderItem={chef => (
          <ChefCard name={chef.item.displayName} avatar={chef.item.avatarUrl} />
        )}
        keyExtractor={chef => chef.id}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ChefsList;
