import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CowListScreen from '../screens/CowList/CowListScreen';
import CreateCowScreen from '../screens/CreateCow/CreateCowScreen';
import CowDetailScreen from '../screens/CowDetail/CowDetailScreen';

export type RootStackParamList = {
    CowList: undefined;
    CreateCow: { preservedFilters?: { query?: string; status?: string; pen?: string } } | undefined;
    CowDetail: { cowId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="CowList" component={CowListScreen} options={{ title: 'Cows', gestureEnabled: false }} />
                <Stack.Screen name="CreateCow" component={CreateCowScreen} options={{ title: 'New Cow', gestureEnabled: false }} />
                <Stack.Screen name="CowDetail" component={CowDetailScreen} options={{ title: 'Cow details', gestureEnabled: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}