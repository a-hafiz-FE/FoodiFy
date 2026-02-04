import React from 'react';
import { View, Dimensions } from 'react-native';
import { styles } from './styles';
import SearchTopBar from './SearchComponents/SearchTopBar';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import RecipeList from './SearchComponents/RecipeList';
import ChefsList from './SearchComponents/ChefsList';
import TagsList from './SearchComponents/TagsList';

const renderScene = SceneMap({
  recipes: RecipeList,
  chefs: ChefsList,
  tags: TagsList,
});

const screenwidth = Dimensions.get('screen').width;

const SearchScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'recipes', title: 'Recipes' },
    { key: 'chefs', title: 'Chefs' },
    { key: 'tags', title: 'Tags' },
  ]);

  return (
    <View style={styles.container}>
      <SearchTopBar />

      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
            style={styles.tabBarStyle}
            indicatorStyle={styles.indecatorStyle}
            activeColor="#000"
            inactiveColor="#000"
          />
        )}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: screenwidth }}
        style={styles.tabViewStyle}
      />
    </View>
  );
};

export default SearchScreen;
