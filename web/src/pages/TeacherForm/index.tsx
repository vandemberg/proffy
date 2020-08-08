import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import { useHistory } from 'react-router';

import './styles.css';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '00:00 AM', to: '00:00 PM' },
  ]);

  const history = useHistory();

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '00:00 AM', to: '00:00 PM' }
    ]);
  }

  function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso');
      history.push('/study')
    }).catch(() => {
      alert('Erro ao cadastrar')
    });
  }

  function setScheduleItemsValue(index: number, field: string, value: string) {
    const updateScheduleItems = scheduleItems.map((item, itemIndex) => {
      if (index === itemIndex) {
        return { ...item, [field]: value }
      }

      return { ...item };
    });

    setScheduleItems([...updateScheduleItems]);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        description="O primeiro passo é preencher esse formulário de inscrição."
        title="Estes são os proffys disponíveis">
      </PageHeader>

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input label="Nome Completo" value={name} name="name" onChange={(e) => setName(e.target.value)} />
            <Input label="Avatar" name="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
            <Input label="Whatsapp" name="whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            <Textarea label="Biografia" name="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
          </fieldset>

          <fieldset>
            <legend>Sobre as aulas</legend>

            <Select
              label="Matéria"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Design', label: 'Design' },
                { value: 'Pintura', label: 'Pintura' },
              ]}
            />
            <Input label="cost" name="Custo da sua hora aula" value={cost} onChange={(e) => setCost(e.target.value)} />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
            <button type="button" onClick={() => addNewScheduleItem()}> + Novo horário </button>
            </legend>

            {
              scheduleItems.map((item: any, index: number) =>
                <div key={index} className="schedule-item">
                  <Select
                    label="Dia da semana"
                    onChange={e => setScheduleItemsValue(index, 'week_day', e.target.value)}
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

                  <Input type="time" name="from" label="De" onChange={e => setScheduleItemsValue(index, 'from', e.target.value)} />
                  <Input type="time" name="To" label="Até" onChange={e => setScheduleItemsValue(index, 'to', e.target.value)} />
                </div>
              )
            }
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>

            <button type="submit">
              Salvar cadastro
          </button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
