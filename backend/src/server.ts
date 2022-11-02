import Fastify, { fastify } from 'fastify'
import {v4 as uuid} from 'uuid'
import cors from '@fastify/cors'

import {prismaClient} from './configs/prisma'

async function main(){
  const server  = Fastify({
    logger: true
  })
  const PORT = process.env.PORT ||  8000


  try{
    await server.register(cors,{
      origin: true
    })

    server.get('/pools/count', async (req,res) => {
      try{
        const pools = await prismaClient.pool.count()

        return await res.send({pools})
      }catch(err){
        console.log(err)
      }
    })
    

    server.post('/pools',async (req,res) => {
      const {title} = req.body as {title:string}
      try{
        const code = uuid().slice(0, 6)
        const pool = await prismaClient.pool.create({
          data:{
            title,
            code
          }
        })
        return res.send({pool})
      }catch(err){
        console.log(err)
      }
    })


    await server.listen({port:+PORT, host: '0.0.0.0'})

    console.log(`🚀Server running at http://localhost:${PORT}`)
  }catch(err){
    console.log(err)
  }

}

main()