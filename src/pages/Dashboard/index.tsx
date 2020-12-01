import React, { useCallback, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiClock, FiPower } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

import { 
  Container, 
  Header, 
  HeaderContent, 
  Profile, 
  Content, 
  Schedule, 
  NextAppointment, 
  Calendar,
  Section,
  Appointment
} from './styles';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if(modifiers.available) {
      setSelectedDate(day)
    }
  }, []);

  const { signOut, user } = useAuth();

  return (
    <Container>
        <Header>
          <HeaderContent>
            <img src={logoImg} alt="GoBarber" />

            <Profile>
              <img 
                src="https://avatars0.githubusercontent.com/u/50683707?s=460&u=815e17144b002baffd6f4eec3336c62a4f088e20&v=4" 
                alt={user.name} 
              
              />
              <div>
                <span>Bem-vindo,</span>
                <strong>{user.name}</strong>
              </div>
            </Profile>

            <button onClick={signOut} type="button">
              <FiPower size={20} />
            </button>
          </HeaderContent>
        </Header>

        <Content>
          <Schedule>
            <h1>Horários agendados</h1>
            <p>
              <span>Hoje</span>
              <span>Dia 06</span>
              <span>Segunda-feira</span>
            </p>

            <NextAppointment>
              <strong>Atendimento a seguir</strong>

              <div>
                <img 
                  src="https://avatars0.githubusercontent.com/u/50683707?s=460&u=815e17144b002baffd6f4eec3336c62a4f088e20&v=4" 
                  alt="Marcos Vinicius"
                />
                <strong>Marcos Viniciuis</strong>

                <span>
                  <FiClock />
                  08:00
                </span>
              </div>
            </NextAppointment>

            <Section>
              <strong>Manhã</strong>

              <Appointment>
                <span>
                  <FiClock />
                  08:00
                </span>

                <div>
                  <img 
                    src="https://avatars0.githubusercontent.com/u/50683707?s=460&u=815e17144b002baffd6f4eec3336c62a4f088e20&v=4" 
                    alt="Marcos Vinicius"
                  />
                </div>
              </Appointment>

              <Appointment>
                <span>
                  <FiClock />
                  08:00
                </span>

                <div>
                  <img 
                    src="https://avatars0.githubusercontent.com/u/50683707?s=460&u=815e17144b002baffd6f4eec3336c62a4f088e20&v=4" 
                    alt="Marcos Vinicius"
                  />
                </div>
              </Appointment>
            </Section>

            <Section>
              <strong>Tarde</strong>

              <Appointment>
                <span>
                  <FiClock />
                  14:00
                </span>

                <div>
                  <img 
                    src="https://avatars0.githubusercontent.com/u/50683707?s=460&u=815e17144b002baffd6f4eec3336c62a4f088e20&v=4" 
                    alt="Marcos Vinicius"
                  />
                </div>
              </Appointment>
            </Section>

          </Schedule>
          <Calendar>
            <DayPicker 
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              disabledDays={[{ daysOfWeek: [0,6] }]}
              modifiers={{
                available: { daysOfWeek: [1,2,3,4,5] }
              }}
              selectedDays={selectedDate}
              onDayClick={handleDateChange}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>
        </Content>
      </Container>
  );
}

export default Dashboard;
