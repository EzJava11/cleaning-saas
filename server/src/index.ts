import express from "express";
import { prisma } from "./lib/prisma"
import { Prisma } from "./generated/prisma/client";
import { error } from "console";

const app = express()

const PORT = 3000

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({
        message: "Cleanning SaaS API is running"
    })
})

app.get("/services", async (req, res) => {
    try {
        const services = await prisma.service.findMany({
            include: {
                worker: {
                    select: {
                        name: true
                    }
                },
                customer: {
                    select: {
                        name: true
                    }
                },
                customerId: false,
                workerId: false
            }
        })
        res.json({
            services
        })
    }
    catch (error) {
        res.status(500).json({
            error
        })
    }
})

app.post("/services", async (req, res) => {
    try {
        interface CreateServiceData{
            customerId: number,
            workerId: number,
            date: string
        }

        const data: CreateServiceData = req.body

        if (typeof data.customerId !== "number" || typeof data.workerId !== "number"
            || typeof data.date !== "string"){
                return res.status(400).json({
                    error: "Invalid data"
                })
        }


            const service = await prisma.service.create({
                data: {
                    customerId: data.customerId,
                    workerId: data.workerId,
                    date: data.date
                }
            })
        res.status(201).json({
            service
        })
    }
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if(error.code === "P2003"){
                return res.status(400).json({
                error: "Customer or worker does not exist"
            })
            }
        }
        return res.status(500).json({
            error
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})