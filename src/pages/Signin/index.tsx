import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background, AnimationContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
    email: string;
    password: string;
}

const Signin: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useAuth();
    const { addToast } = useToast();
    const history = useHistory();

    const handleOnSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false
            });

            await signIn({
                email: data.email,
                password: data.password
            });

            history.push('/dashboard')

            addToast({
                type: 'success',
                title: 'Sucesso',
                description: 'Usuário autenticado com sucesso!.'
            });

        } catch(err){
            if(err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
        
                formRef.current?.setErrors(errors);

                return;
            }
            
            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
            });
        }
    }, [signIn, addToast, history]);
    
    return (
        <>
            <Container>
                <Content>
                    <AnimationContainer>
                        <img src={logoImg} alt="Go barber"/>

                        <Form ref={formRef} onSubmit={handleOnSubmit}>
                            <h1>Faça seu logon</h1>

                            <Input name="email" placeholder="E-mail" icon={FiMail}/>

                            <Input type="password" name="password" placeholder="Senha" icon={FiLock}/>

                            <Button type="submit">Entrar</Button>

                            <a href="#">Esqueci minha senha</a>
                        </Form>
                        <Link to="/sign-up">
                            <FiLogIn />
                            Criar conta
                        </Link>
                    </AnimationContainer>
                </Content>

                <Background />
            </Container>
        </>
    );
} 

export default Signin;