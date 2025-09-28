import React from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppSelector } from '../../redux/store';
import HeaderComponent from '../../components/HeaderComponent';
import Images from '../../constants/images';
import { COLOR } from '../../constants/color';

const { width, height } = Dimensions.get('window');

export default function CowDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { cowId } = route.params;
  const cow = useAppSelector(state => state.cows.cows.find(c => c.id === cowId));
  console.log('Rendering CowDetailScreen for cowId:', cowId);
  console.log('Found cow:', cow);


  if (!cow) return <View style={styles.noDataFound}><Text>Cow not found</Text></View>;

  return (
    <View style={styles.container}>
      <HeaderComponent
        title="Cow Catalog"
        backgroundImage={Images.header}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.cowDetailsContainer}>
        <Text style={styles.earTagTextStyle}>{cow.earTag}</Text>
        <Text>{cow.sex} • Pen: {cow.pen}</Text>
        <Text>Status: {cow.status}</Text>
        <Text>Weight: {cow.weight ? `${cow.weight} kg` : '—'}</Text>
        <Text>Created: {new Date(cow.createdAt).toLocaleString()}</Text>

        <View style={styles.timelineContainer}>
          <Text style={styles.timelineFontStyle}>Timeline</Text>
          {cow.events.length === 0 ? <Text>No events</Text> : cow.events.map(ev => (
            // console.log('ReRendering event:------>', ev),
            <View key={ev.id} style={styles.eventItemContainer}>
              <Text>{ev.type} — {new Date(ev.date).toLocaleString()}</Text>
              {ev.note && <Text>{ev.note}</Text>}
            </View>
          ))}
        </View>
      </View>
      <Image style={styles.cowImage} source={Images.cow_bg} resizeMode="cover" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
  },
  noDataFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cowImage: {
    width: '100%',
    height: height / 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  cowDetailsContainer: {
    backgroundColor: COLOR.WHITE,
    borderRadius: 12,
    shadowColor: COLOR.BLACK_COLOR,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
    padding: 16,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: "center",
    width: width - 30,
  },
  earTagTextStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  timelineContainer: {
    marginTop: 16
  },
  timelineFontStyle: {
    color: COLOR.PRIMARY_COLOR,
    fontWeight: '600'
  },
  eventItemContainer: {
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
});