import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Signin: React.FC = () => {
    return (
        <>
            <Container>
                <Content>
                    <img src={logoImg} alt="Go barber"/>

                    <form>
                        <h1>Faça seu logon</h1>

                        <Input name="E-mail" placeholder="E-mail" icon={FiMail}/>

                        <Input name="Senha" type="password" placeholder="Senha" icon={FiLock}/>

                        <Button type="submit">Entrar</Button>

                        <a href="#">Esqueci minha senha</a>
                    </form>
                    <Link to="/sign-up">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </Content>

                <Background />
            </Container>
        </>
    );
} 

export default Signin;