require("express-async-errors")
require("dotenv").config()

const express = require("express")
const app = express()

const connectDB = require("./db/connectDB")
const productRoutes = require("./routes/productRoutes")
const notFound = require("./middlerware/notFound")
const errorMiddlerware = require("./middlerware/errorMiddlerware")

app.use(express.json())

app.use("/", (req, res) => {
	res.status(200).send("<h1>how to use</h1>")
})
app.use("/api/v1/products", productRoutes)

app.use(errorMiddlerware)
app.use(notFound)

const port = process.env.PORT || 5000

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		await app.listen(port, console.log(`app running at ${port}...`))
	} catch (error) {
		console.log(error)
	}
}

start()
