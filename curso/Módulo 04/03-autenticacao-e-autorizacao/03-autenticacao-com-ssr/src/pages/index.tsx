import type { GetServerSideProps, NextPage } from 'next'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { api } from '../services/apiClient';
import { withSSRGuest } from '../utils/withSSRGuest';

const Home: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, isAuthenticated } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email, 
      password
    }

    await signIn(data)
  }

  useEffect(() => {
    api.get('/me')
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />  
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />  
      <button type="submit">Entrar</button>
    </form>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {  
  return {
    props: {}
  }
});

