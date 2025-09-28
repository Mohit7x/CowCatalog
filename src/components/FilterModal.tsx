import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
    setPenFilter,
    setStatusFilter,
    clearFilters,
} from '../redux/slices/cowsSlice';
import { COLOR } from '../constants/color';

const { width } = Dimensions.get('window');

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
}

const FilterModal = ({ visible, onClose }: FilterModalProps) => {
    const dispatch = useAppDispatch();
    const { status, pen } = useAppSelector(state => state.cows.filters);

    const statusOptions = ['Active', 'In Treatment', 'Deceased'];
    const penOptions = ['A1', 'A2', 'B1', 'B2'];

    // 🧠 Local states (not yet applied to Redux)
    const [localStatus, setLocalStatus] = useState<string | undefined>(status);
    const [localPen, setLocalPen] = useState<string | undefined>(pen);

    // When modal opens, sync local filters with global filters
    useEffect(() => {
        if (visible) {
            setLocalStatus(status);
            setLocalPen(pen);
        }
    }, [visible, status, pen]);

    const handleDone = () => {
        // ✅ Apply selected filters to Redux
        dispatch(setStatusFilter(localStatus));
        dispatch(setPenFilter(localPen));
        onClose();
    };

    const handleClear = () => {
        setLocalStatus(undefined);
        setLocalPen(undefined);
        dispatch(clearFilters());
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Filter Cows</Text>

                    {/* Status Filter */}
                    <Text style={styles.sectionTitle}>Status</Text>
                    <View style={styles.optionContainer}>
                        {statusOptions.map(s => {
                            const isSelected = localStatus === s;
                            return (
                                <TouchableOpacity
                                    key={s}
                                    onPress={() =>
                                        setLocalStatus(isSelected ? undefined : s)
                                    }
                                    style={[
                                        styles.optionButton,
                                        {
                                            backgroundColor: isSelected
                                                ? COLOR.PRIMARY_COLOR
                                                : COLOR.WHITE,
                                            borderColor: COLOR.PRIMARY_COLOR,
                                        },
                                    ]}>
                                    <Text
                                        style={[
                                            styles.optionText,
                                            { color: isSelected ? COLOR.WHITE : COLOR.PRIMARY_COLOR },
                                        ]}>
                                        {s}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Pen Filter */}
                    <Text style={styles.sectionTitle}>Pen</Text>
                    <View style={styles.optionContainer}>
                        {penOptions.map(p => {
                            const isSelected = localPen === p;
                            return (
                                <TouchableOpacity
                                    key={p}
                                    onPress={() =>
                                        setLocalPen(isSelected ? undefined : p)
                                    }
                                    style={[
                                        styles.optionButton,
                                        {
                                            backgroundColor: isSelected
                                                ? COLOR.PRIMARY_COLOR
                                                : COLOR.WHITE,
                                            borderColor: COLOR.PRIMARY_COLOR,
                                        },
                                    ]}>
                                    <Text
                                        style={[
                                            styles.optionText,
                                            { color: isSelected ? COLOR.WHITE : COLOR.PRIMARY_COLOR },
                                        ]}>
                                        {p}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Buttons */}
                    <View style={styles.footerContainer}>
                        <TouchableOpacity onPress={handleClear}>
                            <Text style={[styles.footerText, { color: COLOR.ERROR_COLOR }]}>
                                Clear
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleDone}>
                            <Text style={[styles.footerText, { color: COLOR.PRIMARY_COLOR }]}>
                                Apply
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default FilterModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: width * 0.9,
        backgroundColor: COLOR.WHITE,
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLOR.PRIMARY_COLOR,
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLOR.PRIMARY_COLOR,
        marginTop: 10,
        marginBottom: 5,
    },
    optionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },
    optionButton: {
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
    optionText: {
        fontSize: 14,
        fontWeight: '500',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
