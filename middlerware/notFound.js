const notFound = (req, res) => {
	return res.status(400).send("<h1>page not found</h1>")
}

module.exports = notFound
