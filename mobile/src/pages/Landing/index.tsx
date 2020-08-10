import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

function Landing() {
  const [connections, setConnections] = useState(0);

  useEffect(() => {
    api.get('connections')
      .then((result) => setConnections(result.data.total));
  }, [])

  const { navigate } = useNavigation();

  function handleNavigationToGiveClasses() {
    navigate('GiveClasses');
  }

  function handleNavigationToStudyList() {
    navigate('StudyTabs');
  }

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton onPress={() => handleNavigationToStudyList()} style={[styles.button, styles.buttonPrimary]}>
          <Image source={studyIcon} />

          <Text style={styles.buttonText}> Estudar </Text>
        </RectButton>

        <RectButton onPress={() => handleNavigationToGiveClasses()} style={[styles.button, styles.buttonSecondary]}>
          <Image source={giveClassesIcon} />

          <Text style={styles.buttonText}> Dar aulas </Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {connections} conexões já realizadas {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  )
}

export default Landing;
