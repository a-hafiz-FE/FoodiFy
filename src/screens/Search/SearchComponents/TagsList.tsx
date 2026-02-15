import React, { useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { styles } from '../styles';
import TagCard from '../../../Components/TagCard';
import { useMealStore } from '../../../app/mealStore';

const TagsList = () => {
  const tagsById = useMealStore(s => s.tagsById);
  const tags = useMemo(() => Object.values(tagsById), [tagsById]);
  return (
    <View style={styles.ChefsListStyle}>
      <FlatList
        data={tags}
        renderItem={tag => <TagCard name={tag.item.label} />}
        keyExtractor={tag => tag.id}
        ItemSeparatorComponent={() => <View style={{ height: 17 }} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TagsList;
