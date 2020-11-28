import React, { useRef, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    
    const { addToast } = useToast();

    const history = useHistory();
    const location = useLocation();

    const handleOnSubmit = useCallback(async (data: ResetPasswordFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                password: Yup.string().required('Senha obrigatória'),
                password_confirmation: Yup.string()
                    .oneOf([Yup.ref('password'), undefined], 'Confirmacao incorreta')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            const { password_confirmation, password } = data;
            const token = location.search.replace('?token=', '');

            if(!token) {
                throw new Error('Token not exists')
            }

            await api.post('password/reset', {
                password,
                password_confirmation,
                token,
            });

            history.push('/');
        } catch(err){
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
        
                formRef.current?.setErrors(errors);

                return;
            }
            
            addToast({
                type: 'error',
                title: 'Erro ao resetar senha',
                description: 'Ocorreu um erro ao resetar sua senha, tente novamente.'
            });
        }
    }, [addToast, history, location.search]);
    
    return (
        <>
            <Container>
                <Content>
                    <AnimationContainer>
                        <img src={logoImg} alt="Go barber"/>

                        <Form ref={formRef} onSubmit={handleOnSubmit}>
                            <h1>Resetar senha</h1>

                            <Input 
                                type="password" 
                                icon={FiLock}
                                name="password" 
                                placeholder="Nova senha" 
                            
                            />
                            <Input 
                                name="password_confirmation" 
                                icon={FiLock}
                                type="password" 
                                placeholder="Confirmação da senha" 
                            />

                            <Button type="submit">Alterar senha</Button>
                        </Form>
                    </AnimationContainer>
                </Content>

                <Background />
            </Container>
        </>
    );
} 

export default ResetPassword;