import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const AppStack = createStackNavigator();

import Incidentes from './pages/Incidents';
import Detail from './pages/Detail';

function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false}}>
                <AppStack.Screen name="incidentes" component={Incidentes} />
                <AppStack.Screen name="detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;