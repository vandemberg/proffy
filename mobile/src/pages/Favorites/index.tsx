import React, { useState } from 'react';

import styles from './styles';
import { View, ScrollView, AsyncStorage } from 'react-native';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { useFocusEffect } from '@react-navigation/native';

function Favorites() {
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites')
      .then(result => {
        if (result) {
          const favoritedTeachers = JSON.parse(result);
          setFavorites(favoritedTeachers);
        }
      })
  }

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <PageHeader title='Meus proffies favoritos' />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}
      >
        {favorites.map((teacher: Teacher) => (
          <TeacherItem
            teacher={teacher}
            key={teacher.id}
            favorited={true}
          />)
        )}
      </ScrollView>
    </View>
  )
}

export default Favorites;
