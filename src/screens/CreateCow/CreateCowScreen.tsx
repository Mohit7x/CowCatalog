import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addCow } from '../../redux/slices/cowsSlice';
import { useNavigation } from '@react-navigation/native';
import HeaderComponent from '../../components/HeaderComponent';
import Images from '../../constants/images';
import { COLOR } from '../../constants/color';

const { width, height } = Dimensions.get('window');
export default function CreateCowScreen() {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const cows = useAppSelector(state => state.cows.cows);

    const [earTag, setEarTag] = useState('');
    const [sex, setSex] = useState<'Male' | 'Female' | ''>('');
    const [pen, setPen] = useState('');
    const [status, setStatus] = useState<'Active' | 'In Treatment' | 'Deceased'>('Active');
    const [weightText, setWeightText] = useState('');

    function onSave() {
        if (!earTag.trim()) return Alert.alert('Validation', 'Ear tag required');
        if (!sex) return Alert.alert('Validation', 'Sex required');
        if (!pen.trim()) return Alert.alert('Validation', 'Pen required');

        const existing = cows.find(c => c.earTag === earTag.trim());
        if (existing) return Alert.alert('Validation', 'Ear tag must be unique');

        const weight = weightText ? Number(weightText) : undefined;
        if (weightText && (isNaN(weight) || weight <= 0)) return Alert.alert('Validation', 'Weight must be positive');

        try {
            dispatch(addCow({ earTag: earTag.trim(), sex, pen: pen.trim(), status, weight }));
            Alert.alert('Success', 'Cow added', [{ text: 'OK', onPress: () => navigation.goBack() }]);
        } catch (err: any) {
            Alert.alert('Error', err.message);
            console.log('Error adding cow:----->', err);

        }
    }

    return (
        <View style={styles.container}>
            <HeaderComponent
                title="Create Cow"
                backgroundImage={Images.header}
                onBackPress={() => navigation.goBack()}
                rightIcon={null}
            />
            <View style={styles.formContainer}>


                <Text style={styles.labelStyle}>Ear Tag *</Text>
                <TextInput
                    value={earTag}
                    onChangeText={setEarTag}
                    style={styles.inputStyle}
                />

                <Text style={styles.labelStyle}>Sex *</Text>
                <View style={styles.touchableContainer}>
                    <TouchableOpacity onPress={() => setSex('Male')} style={styles.checkboxContainer}>
                        <Text>{sex === 'Male' ? 'Male ✓' : 'Male'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSex('Female')} style={styles.checkboxContainer}>
                        <Text>{sex === 'Female' ? 'Female ✓' : 'Female'}</Text>
                    </TouchableOpacity>
                </View>


                <Text style={styles.labelStyle}>Pen *</Text>
                <TextInput
                    value={pen}
                    onChangeText={setPen}
                    style={styles.inputStyle} />

                <Text style={styles.labelStyle}>Status</Text>
                <View style={styles.touchableContainer}>
                    {['Active', 'In Treatment', 'Deceased'].map(s => (
                        <TouchableOpacity key={s} onPress={() => setStatus(s as any)} style={styles.checkboxContainer}>
                            <Text>{status === s ? `${s} ✓` : s}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.labelStyle}>Weight (kg)</Text>
                <TextInput
                    value={weightText}
                    onChangeText={setWeightText}
                    keyboardType="numeric"
                    style={styles.inputStyle} />

                <TouchableOpacity
                    onPress={onSave}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonTextStyle}>Save</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        height: height,
        width: width,
    },
    formContainer: {
        width: width - 32,
        marginTop: 16,
    },
    inputStyle: {
        borderWidth: 1,
        height: 40,
        marginBottom: 8,
        borderRadius: 6,
        paddingLeft: 10,
    },
    labelStyle: {
        marginBottom: 4,
        fontWeight: '500',
        color: COLOR.PRIMARY_COLOR,
    },
    touchableContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 8,
    },
    checkboxContainer: {
        borderWidth: 1,
        padding: 8,
        borderRadius: 5
    },
    buttonContainer: {
        backgroundColor: COLOR.PRIMARY_COLOR,
        padding: 12,
        borderRadius: 5,
        marginTop: 12
    },
    buttonTextStyle: {
        color: COLOR.WHITE,
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 14
    },
});