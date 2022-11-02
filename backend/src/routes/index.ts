import {RouteOptions} from 'fastify'

export  function Routes(fastify){
   fastify.get('/',async (request, response) => {
    await response.send({name:'Icaro Vieira da Silva'})
  })
}