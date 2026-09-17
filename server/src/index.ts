import express from "express";
import {prisma} from "./lib/prisma"

const app = express()

const PORT = 3000

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({
        message: "Cleanning SaaS API is running"
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})