import { NestFactory } from '@nestjs/core'
import { config as envConfig } from 'dotenv'

import { AppModule } from './app.module'

envConfig()

async function bootstrap() {
  const port = process.env.PORT || 3333
  const ORIGIN = process.env.ORIGIN || ''
  const origins = ORIGIN.split(',').map(item => item.trim())
  let origin: string | RegExp[]
  if (
    (origins.length === 1 && (origins[0] === '' || origins[0] === '*')) ||
    origins.length === 0
  ) {
    origin = '*'
  } else {
    origin = origins.map(item => new RegExp(item))
  }

  const app = await NestFactory.create(AppModule, {
    cors: { origin },
  })
  app.setGlobalPrefix('/api')

  await app.listen(port)
}

bootstrap()
