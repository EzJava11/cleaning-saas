import { log } from "console"
import {prisma} from "./lib/prisma"


async function main(){
    // const company = await prisma.company.create({
    //     data:{
    //         name: "Compañia ficticia",
    //         address: "micasa"
    //     }
    // })
    // const companies = await prisma.company.findMany()

    // console.log(companies);


    // const worker = await prisma.worker.create({
    //     data:{
    //         name: "Pedro Garcia",
    //         company: {
    //             connect:{
    //                 id:1
    //             }
    //         }
    //     }
    // })
    // const workers = await prisma.worker.findMany()

    // console.log(workers);

    // const worker = await prisma.worker.delete({
    //     where:{
    //         id:2
    //     }
    // })

    // const customer = await prisma.customer.create({
    //     data:{
    //         name: "Carlos López",
    //         company:{
    //             connect:{
    //                 id:1
    //             }
    //         }
    //     }
    // })

    // const customers = await prisma.customer.findMany()

    // console.log(customers);
    
    // const date = new Date()

    // const service = await prisma.service.create({
    //     data:{
    //         customer:{
    //             connect:{
    //                 id:1
    //             }
    //         },
    //         worker:{
    //             connect:{
    //                 id:4
    //             }
    //         },
    //         date: date
    //     }
    // })

    const services = await prisma.service.findMany({
        include:{
            customer: {
                select: {
                    name: true
                }
            },
            worker: {
                select:{
                    name:true
                }
            },
            customerId: false,
            workerId: false
        }
    })

    console.log(services);
    
}

main()