import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi'
// import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleOnSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data, {
                abortEarly: false
            });

        } catch(err){
            const errors = getValidationErrors(err);
        
            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
        <>
            <Container>
                <Background />
                <Content>
                    <img src={logoImg} alt="Go barber"/>

                    <Form ref={formRef} onSubmit={handleOnSubmit}>
                        <h1>Faça seu cadastro</h1>

                        <Input name="name" placeholder="Nome" icon={FiUser}/>

                        <Input name="email" placeholder="E-mail" icon={FiMail}/>

                        <Input type="password" name="password" placeholder="Senha" icon={FiLock}/>

                        <Button type="submit">Cadastrar</Button>
                    </Form>
                    <a href="/">
                        <FiArrowLeft />
                        Voltar para logon
                    </a>
                </Content>
            </Container>
        </>
    );
} 

export default SignUp;