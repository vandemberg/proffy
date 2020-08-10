import React, { useState, useEffect } from 'react';

import { Feather } from '@expo/vector-icons'
import styles from './styles';
import { View, Text, AsyncStorage } from 'react-native';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [teachers, setTeachers] = useState([]);

  const [favorites, setFavorites] = useState<number[]>([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites')
      .then(result => {
        if (result) {
          const favoritedTeachers = JSON.parse(result);
          const favoritedTeacherIds = favoritedTeachers.map(
            (teacher: Teacher) => teacher.id);

          setFavorites(favoritedTeacherIds);
        }
      })
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  function handleToogleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFilterSubmit() {
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    });

    loadFavorites();
    setIsFiltersVisible(false);
    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title='Proffies disponíveis'
        headerRight={(
          <BorderlessButton onPress={() => handleToogleFiltersVisible()}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              value={subject}
              placeholderTextColor="#c1bccc"
              style={styles.input}
              onChangeText={(text) => setSubject(text)}
              placeholder="QUal a matéria?"
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  value={week_day}
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  onChangeText={(text) => setWeekDay(text)}
                  placeholder="Qual o dia?"
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  value={time}
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  onChangeText={(text) => setTime(text)}
                  placeholder="Qual o horário?"
                />
              </View>
            </View>
            <RectButton
              onPress={() => handleFilterSubmit()}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            teacher={teacher}
            key={teacher.id}
            favorited={favorites.includes(teacher.id)}
          />)
        )}
      </ScrollView>
    </View>
  )
}

export default TeacherList;
