import React from 'react'

import MontsLogo from '../../assets/images/logo.svg'
import { Container } from './styles'

const Home: React.FC = () => {
  return (
    <Container>
      <a href="https://monts.com.br" target="_blank" rel="noopener noreferrer">
        <MontsLogo />
      </a>

      <h1>Welcome to Kedros Next</h1>

      <p>
        A ReactJS & Next.js structure made by{' '}
        <a
          href="https://monts.com.br"
          target="_blank"
          rel="noopener noreferrer"
        >
          Monts
        </a>
      </p>
    </Container>
  )
}

export default Home
