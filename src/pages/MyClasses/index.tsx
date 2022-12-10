import React, { useState, FormEvent, useEffect } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { ITeacher } from '../../components/TeacherItem';
import Input from '../../components/Input';

import api from '../../services/api';

import './styles.css';
import userEvent from '@testing-library/user-event';
import { useAuth } from '../../context/auth';
import MyClassesItem from '../../components/MyClassesItem';

function MyClasses() {
    const { user } = useAuth();
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState("");

    async function handleSercheTeacherd() {
        
        const response = await api.get('myclasses', {
            params: {
                subject: user?.id
            }
        })

        setTeachers(response.data);
    }    

    useEffect(() => {
        handleSercheTeacherd();        
    }, []);

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader
                title="Estas são as aulas que você está oferecendo"
                page="Minhas turmas"
            >
            </PageHeader>
        
            <main>
                {
                    teachers && teachers.map((teacher: ITeacher) => (
                        <MyClassesItem key={teacher.id} teacher={teacher} />
                    ))
                }
            </main>
        </div>
    )
}

export default MyClasses;