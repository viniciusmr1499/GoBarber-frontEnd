import React from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
    function handleOnSubmit (data: object): void {
        console.log(data);
    }

    return (
        <>
            <Container>
                <Background />
                <Content>
                    <img src={logoImg} alt="Go barber"/>

                    <Form onSubmit={handleOnSubmit}>
                        <h1>Faça seu cadastro</h1>

                        <Input name="Nome" placeholder="Nome" icon={FiUser}/>

                        <Input name="E-mail" placeholder="E-mail" icon={FiMail}/>

                        <Input name="Senha" type="password" placeholder="Senha" icon={FiLock}/>

                        <Button type="submit">Cadastrar</Button>
                    </Form>
                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para logon
                    </Link>
                </Content>
            </Container>
        </>
    );
} 

export default SignUp;