import React, { useEffect, useState } from 'react';

import './styles.css';
import WeekDay from '../WeekDay';
import api from '../../services/api';
import Classroom from '../../pages/Classroom';

interface IImage {
    url: string;
    name: string
}

interface IUser {
    id: number;
    name: string;
    surname: string;
    bio: string
    whatsapp: string;
    image: IImage
}

interface ISchedules {
    id: number;
    week_day: number;
    from: number;
    to: number;
}

interface IWeekday {
    domingo: boolean;
    segunda: boolean;
    terca: boolean;
    quarta: boolean;
    quinta: boolean;
    sexta: boolean;
    sabado: boolean;
}

interface IClassRoom {

}

export interface ITeacher {
    id: number;
    cost: number;
    subject: string;
    user: IUser;
    weekday: IWeekday;
    schedules: ISchedules[];
}

interface ITeacherItemPros {
    teacher: ITeacher
}

const MyClassesItem: React.FC<ITeacherItemPros> = ({ teacher }) => {
    const [domingo, setDomingo] = useState<ISchedules>();
    const [segunda, setSegunda] = useState<ISchedules>();
    const [terca, setTerca] = useState<ISchedules>();
    const [quarta, setQuarta] = useState<ISchedules>();
    const [quinta, setQuinta] = useState<ISchedules>();
    const [sexta, setSexta] = useState<ISchedules>();
    const [sabado, setSabado] = useState<ISchedules>();

    const [activatedDay, setActivatedDay] = useState("");

    // const {} = 

    useEffect(() => {
        setDomingo(teacher.schedules.find((schedule: ISchedules) => schedule.week_day === 1));
        setSegunda(teacher.schedules.find((schedule: ISchedules) => schedule.week_day === 2));
        setTerca(teacher.schedules.find((schedule: ISchedules) => schedule.week_day === 3));
        setQuarta(teacher.schedules.find((schedule: ISchedules) => schedule.week_day === 4));
        setQuinta(teacher.schedules.find((schedule: ISchedules) => schedule.week_day === 5));
        setSexta(teacher.schedules.find((schedule: ISchedules) => schedule.week_day === 6));
        setSabado(teacher.schedules.find((schedule: ISchedules) => schedule.week_day === 7));
        
    }, [teacher.schedules]);

    async function handleCreateNewConnection() {
        alert('Aula deletada');

        await api.delete('myclasses/delete', {
            params: {
                subject: teacher.id
            }             
        });
           
        window. location. reload();
    }

    return (
        <article className="my-classes-item">
            <header>
                <img src={teacher.user.image?.url} alt={teacher.user.name} />
                <div>
                    <strong>{teacher.user.name} {teacher.user.surname}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.user.bio}</p>

            <div className={`my-classes-item-schedule ${activatedDay}`}>
                <WeekDay  
                    day={"domingo"}
                    dayClass={teacher.weekday.domingo}
                    schedule={domingo}
                    setActivatedDay={setActivatedDay}
                    />
                <WeekDay  
                    day={"segunda"}
                    dayClass={teacher.weekday.segunda}
                    schedule={segunda}
                    setActivatedDay={setActivatedDay}
                />
                <WeekDay  
                    day={"terca"}
                    dayClass={teacher.weekday.terca} 
                    schedule={terca}
                    setActivatedDay={setActivatedDay}
                />
                <WeekDay  
                    day={"quarta"}
                    dayClass={teacher.weekday.quarta} 
                    schedule={quarta}
                    setActivatedDay={setActivatedDay}
                />
                <WeekDay  
                    day={"quinta"}
                    dayClass={teacher.weekday.quinta} 
                    schedule={quinta}
                    setActivatedDay={setActivatedDay}
                />
                <WeekDay  
                    day={"sexta"}
                    dayClass={teacher.weekday.sexta} 
                    schedule={sexta}
                    setActivatedDay={setActivatedDay}
                />
                <WeekDay  
                    day={"sabado"}
                    dayClass={teacher.weekday.sabado} 
                    schedule={sabado}
                    setActivatedDay={setActivatedDay}
                />
            </div>

            <footer>
                <p>
                    Preço da minha hora:
                            <strong>R$ {(teacher.cost).toFixed(2)}</strong>
                </p>
                
                <button onClick={handleCreateNewConnection}>                
                            Deletar
                </button>
            </footer>
        </article>
    )
}

export default MyClassesItem;