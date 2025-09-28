import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Images from '../constants/images';

interface HeaderComponentProps {
    title: string;
    backgroundImage: any;
    onBackPress?: () => void;
    rightIcon?: React.ReactNode;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
    title,
    backgroundImage,
    onBackPress,
    rightIcon,
}) => {
    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.overlay} />
            <View style={styles.headerContent}>
                {/* Left button (optional) */}
                {onBackPress ? (
                    <TouchableOpacity onPress={onBackPress} style={styles.sideButton}>
                        <Image source={Images.back} style={styles.backIconStyle} />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.sideButton} />
                )}

                {/* Title */}
                <Text style={styles.title}>{title}</Text>

                {/* Right icon (optional) */}
                <View style={styles.sideButton}>{rightIcon}</View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: 120,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.25)', // dark overlay for contrast
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    sideButton: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backText: {
        fontSize: 28,
        color: '#fff',
    },
    title: {
        flex: 1,
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    backIconStyle: {
        width: 24,
        height: 24,
        tintColor: '#fff',
    },
});

export default HeaderComponent;