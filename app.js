require("express-async-errors")
require("dotenv").config()

const express = require("express")
const app = express()

const connectDB = require("./db/connectDB")
const productRoutes = require("./routes/productRoutes")
const notFound = require("./middlerware/notFound")
const errorMiddlerware = require("./middlerware/errorMiddlerware")

app.use(express.json())

app.use("/api/v1/products", productRoutes)
app.use("/", (req, res) => {
	res.status(200).send(`<h1>how to use</h1>
	<h3>after url end write /api/v1/products to view all products</h3>
	<h3>for searching spacific product name after products write '?name=name' same for feature and company but put '&' between them</h3>
	<h3>for sorting according to price or rating after products write 'sort=price or rating or both but with ',' between them' after products </h3>
	<h3>for fields of your choice after products write ?field='your choice (eg = price,rating,name)'</h3>
	<h3>for page number after products write ?page='your page number'</h3>
	<h3>for limit of products after products write ?limit='your limit'</h3>
	<h3>for filtering according to price and rating after products write '?numericFilters=price>50,rating>=4' '</h3>
	`)
})

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
