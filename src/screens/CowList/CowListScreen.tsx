/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../redux/store';
import Images from '../../constants/images';
import { COLOR } from '../../constants/color';
import HeaderComponent from '../../components/HeaderComponent';

const { width, height } = Dimensions.get('window');

export default function CowListScreen() {
    const navigation = useNavigation();
    const cows = useAppSelector(state => state.cows.cows);
    console.log('Loaded cows:------->', cows);


    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<string | undefined>();
    const [pen, setPen] = useState<string | undefined>();

    const filtered = useMemo(() => {
        return cows.filter(c => {
            if (query && !c.earTag.toLowerCase().includes(query.toLowerCase())) return false;
            if (status && c.status !== status) return false;
            if (pen && c.pen !== pen) return false;
            return true;
        });
    }, [cows, query, status, pen]);


    const showCowDetail = (item: any) => { navigation.navigate('CowDetail', { cowId: item?.id }); }

    const ItemViewOption = ({ iconSource = {}, title = '', label = '' }) => {
        return (<View style={styles.itemContainer}>
            <Image
                source={iconSource}
                style={styles.iconFontStyle}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.labelStyle}>{label}</Text>
                <Text style={styles.iconNameStyle}>{title}</Text>
            </View>
        </View>);
    };

    const getStatusImage = (status: string) => {
        switch (status) {
            case 'Active':
                return Images.active;
            case 'In Treatment':
                return Images.treatment;
            case 'Deceased':
                return Images.deceased;
            default:
                return Images.active;
        }
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => showCowDetail(item)} style={styles.cowItemContainer}>
            <View style={styles.cowListContainer}>
                <ItemViewOption iconSource={Images.tag} label={'Ear Tag:'} title={item.earTag} />
                <ItemViewOption iconSource={Images.sex} label={'Sex:'} title={item.sex} />
                <ItemViewOption iconSource={Images.pen} label={'Pen:'} title={item.pen} />
                <ItemViewOption iconSource={getStatusImage(item.status)} label={'Status:'} title={item.status} />
                <ItemViewOption iconSource={Images.weight} label={'Weight:'} title={item.weight} />
            </View>
            <Image source={Images.cow_bg} style={styles.cowImageStyle} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <HeaderComponent
                title="Cow Catalog"
                backgroundImage={Images.header}
                rightIcon={null}
            />
            <View style={styles.searchContainer}>
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search by ear tag..."
                    placeholderTextColor={COLOR.BORDER_COLOR}
                    style={styles.inputContainerStyle}
                />
                <Image source={Images.search} style={styles.searchIconStyle} />
            </View>

            <View style={styles.tabContainer}>
                {['Active', 'In Treatment', 'Deceased'].map((s) => {
                    const isSelected = status === s;

                    return (
                        <TouchableOpacity
                            key={s}
                            onPress={() => setStatus(isSelected ? undefined : s)}
                            style={[styles.tabButtonContainer,
                            {
                                backgroundColor: isSelected ? COLOR.PRIMARY_COLOR : COLOR.WHITE,
                                borderColor: isSelected ? COLOR.WHITE : COLOR.PRIMARY_COLOR,
                            }]}
                        >
                            <Text
                                style={[styles.tabButtonStyle, {
                                    color: isSelected ? COLOR.WHITE : COLOR.PRIMARY_COLOR,
                                    fontWeight: isSelected ? '600' : '500'
                                }]}
                            >
                                {s}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.listHeaderContainer}>
                <Text style={styles.titleTextStyle}>Cow List</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CreateCow' as never)}>
                    <Image source={Images.add} style={styles.addIconStyle} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.contentContainerStyle}
            // ListEmptyComponent={<Text>No cows found</Text>}
            />
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        height: height,
        width: width,
    },
    inputContainerStyle: {},
    searchContainer: {
        height: 50,
        width: width - 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: COLOR.BORDER_COLOR,
    },
    searchIconStyle: {
        width: 20,
        height: 20,
        tintColor: COLOR.BORDER_COLOR,
    },
    tabContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
    },
    tabButtonContainer: {
        borderWidth: 1,
        width: width * 0.3,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    tabButtonStyle: {
        textAlign: 'center',
    },
    addIconStyle: {
        width: 24,
        height: 24,
        tintColor: COLOR.PRIMARY_COLOR,
    },
    listHeaderContainer: {
        width: width - 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    titleTextStyle: {
        color: COLOR.PRIMARY_COLOR,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    cowItemContainer: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 20,
        justifyContent: "center",
        width: width - 30,
        backgroundColor: COLOR.WHITE,
        borderRadius: 12,
        shadowColor: COLOR.BLACK_COLOR,
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0 },
        elevation: 6,
        flexDirection: 'row',
    },
    itemContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 6,
        marginBottom: 6,
    },
    iconFontStyle: {
        width: 25,
        height: 25,
    },
    iconNameStyle: {
        fontSize: 14,
        color: COLOR.BLACK_COLOR,
        marginLeft: 4,
    },
    labelStyle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLOR.PRIMARY_COLOR,
    },
    contentContainerStyle: { 
        paddingBottom: 100,
    },
    cowListContainer: { 
        width: width / 2,
        justifyContent: 'center',
    },
    cowImageStyle: { 
        height: 150, 
        width: width / 3, 
        alignItems: 'flex-end',
    }
});