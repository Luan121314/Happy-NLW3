import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';

import mapMarker from '../images/mapMarker.png';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface OrphanageProps{
    id: number;
    name: string;
    latitude:number;
    longitude: number;
}

const OrphanagesMap = () => {
    const navigation = useNavigation();
    const [orphanages, setOrphanages] = useState<OrphanageProps[]>([])

    useFocusEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data)
        })
    })


    function handleNavigateToOrphanageDetail(id: number) {
        navigation.navigate('OrphanagesDetail',{id});
    }
    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition');

    }


    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -23.4778756,
                    longitude: -46.2953356,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008
                }}
            >
                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            icon={mapMarker}
                            key={orphanage.id}
                            calloutAnchor={{
                                x: 2.799,
                                y: 0.8
                            }}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude,
                            }}
                        >
                            <Callout tooltip onPress={()=>handleNavigateToOrphanageDetail(orphanage.id)}>
                                <View style={styles.calloutContainer} >
                        <Text style={styles.calloutText} >{orphanage.name}</Text>

                                </View>
                            </Callout>
                        </Marker>
                    )
                })}
            </MapView>
            <View style={styles.footer} >
                <Text style={styles.footerText} >{orphanages.length} orfanatos encontrados</Text>
                <RectButton
                    style={styles.createOrphanageButton}
                    onPress={handleNavigateToCreateOrphanage}
                >
                    <Feather name='plus' size={20} color='#fff' />
                </RectButton>
            </View>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255, 0.8)',
        borderRadius: 16,
        justifyContent: "center"


    },
    calloutText: {
        color: '#0089A5',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold'
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#FFF',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 3

    }, footerText: {
        color: '#8FA7B3',
        fontFamily: 'Nunito_700Bold'

    }, createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default OrphanagesMap;