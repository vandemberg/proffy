import React, { useState, FormEvent, useEffect } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import './styles.css';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList() {

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    function searchClasses() {
      api.get('classes', { params: { time, week_day, subject } })
        .then(result => setClasses(result.data))
        .catch(error => setClasses([]));
    }

    if (subject && week_day && time) {
      searchClasses();
    }
  }, [subject, week_day, time]);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers">
          <Select
            value={subject}
            onChange={e => setSubject(e.target.value)}
            label="Matéria"
            name="subject"
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Design', label: 'Design' },
              { value: 'Pintura', label: 'Pintura' },
            ]}
          />

          <Select
            value={week_day}
            onChange={e => setWeekDay(e.target.value)}
            label="Dia da semana"
            name="week_day"
            options={[
              { value: '0', label: 'Segunda' },
              { value: '1', label: 'Terça' },
              { value: '2', label: 'Quarta' },
              { value: '3', label: 'Quinta' },
              { value: '4', label: 'Sexta' },
              { value: '5', label: 'Sábado' },
            ]}
          />

          <Input type="time" label="time" name="hora" value={time} onChange={e => setTime(e.target.value)} />
        </form>
      </PageHeader>

      <main>
        {
          classes.map((item: Teacher, index) => <TeacherItem teacher={item} key={index} />)
        }
      </main>
    </div>
  );
}

export default TeacherList;
