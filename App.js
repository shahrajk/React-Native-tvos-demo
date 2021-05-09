import React from 'react'
import { View, Text, useTVEventHandler, TouchableOpacity, Pressable, Image, ScrollView, Dimensions, FlatList, LogBox, Platform } from 'react-native'
import faker from 'faker'

const { width, height } = Dimensions.get('screen')

const TVEventHandlerView = () => {
  const [lastEventType, setLastEventType] = React.useState('');
  const [ActiveIndex, setActiveIndex] = React.useState(0);
  const NumberofColumn = 5

  faker.seed(20);
  const DATA = [...Array(150).keys()].map((_, i) => {
    return {
      image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.random.number(60)}.jpg`,
      name: faker.name.findName(),
    };
  });

  const myTVEventHandler = evt => {
    useTVEventHandler(myTVEventHandler);
    if (evt.eventType != 'blur' && evt.eventType != 'focus') {
      setLastEventType(evt.eventType);
    }
  };

  const Shadow = () => {
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 5,
      zIndex: 50
    }
  }

  return (
    <FlatList
      data={DATA}
      numColumns={NumberofColumn}
      renderItem={({ item, index }) =>
        <TouchableOpacity key={index} onFocus={() => setActiveIndex(index)} activeOpacity={1} onPress={() => alert(item.name)}>
          <View style={[{
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
            height: 200,
            margin: 5,
          }, ActiveIndex == index && Shadow()]}>
            <Image source={{ uri: item.image }} style={{ height: 200, width: '100%' }} />
          </View>
          <View style={{ backgroundColor: 'red', marginHorizontal: 5, marginVertical: 15, width: width / NumberofColumn, }}>
            {ActiveIndex == index &&
              <Text numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
            }
          </View>
        </TouchableOpacity>
      }
    />
  );
};


export default function App() {
  LogBox.ignoreAllLogs()
  return (
    <View style={{ flex: 1 }}>
      <TVEventHandlerView />
    </View>
  )
}

