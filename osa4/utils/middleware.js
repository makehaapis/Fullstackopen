const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    const bearerToken = authorization.replace('Bearer ', '')
    request.token = bearerToken
    next()
  }
  else {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
}

const userExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      const bearerToken = authorization.replace('Bearer ', '')
      const decodedToken = jwt.verify(bearerToken, process.env.SECRET)
      request.user = decodedToken.id
      next()
  }
  else {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}