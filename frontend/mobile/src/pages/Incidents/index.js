import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../services/api';

import imgLogo from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [totalincidentes, setTotalIncidentes] = useState(0);
    const navigation = useNavigation();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    async function loadIncidents(){
        if  (loading) {
            return;
        }

        if (totalincidentes> 0 && incidents.length == totalincidentes) {
            return;
        }

        setLoading(true);
        
        const response = await api.get('incidents', {
            params: { page }
        });
        
        setIncidents([...incidents, ...response.data]);
        setTotalIncidentes(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, [])

    function navegateToDetail(incident){
        navigation.navigate('detail', { incident });
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={imgLogo} />
            <Text style={styles.headerText}>
                Total de <Text style={styles.headerTextBold}>{totalincidentes} casos</Text>.
            </Text>
        </View>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

        <FlatList
            style={styles.incidentList}
            data={incidents}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem={({item: incident}) => (
                <View style={styles.incidents}>
                    <Text style={styles.incidentsProperty}>ONG:</Text>
                    <Text style={styles.incidentsValue}>{incident.name}</Text>

                    <Text style={styles.incidentsProperty}>Caso:</Text>
                    <Text style={styles.incidentsValue}>{incident.title}</Text>

                    <Text style={styles.incidentsProperty}>Valor:</Text>
                    <Text style={styles.incidentsValue}>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value) }</Text>

                    <TouchableOpacity style={styles.detailsButton} onPress={() => navegateToDetail(incident)}>
                        <Text  style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041" />
                    </TouchableOpacity>
                </View>
            )}
        />
    </View>
  );
}