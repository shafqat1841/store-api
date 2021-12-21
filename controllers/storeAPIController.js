const Product = require("../model/product")

const getAllProducts = async (req, res) => {
	const { feature, company, name, sort, field, numericFilters } = req.query
	const queryObject = {}
	if (feature) {
		queryObject.feature = feature === "true" ? true : false
	}
	if (company) {
		queryObject.company = company
	}
	if (name) {
		queryObject.name = { $regex: name, $options: "i" }
	}
	if (numericFilters) {
		const operatorMap = {
			">": "$gt",
			">=": "$gte",
			"=": "$eq",
			"<=": "$lte",
			"<": "$lt",
		}

		const regEx = /\b(>|>=|=|<=|<)\b/g

		const options = ["price", "rating"]

		let filters = numericFilters.replace(regEx, (match) => {
			return `-${operatorMap[match]}-`
		})

		filters.split(",").forEach((item) => {
			const [field, operator, value] = item.split("-")
			if (options.includes(field)) {
				queryObject[field] = { [operator]: Number(value) }
			}
		})
	}
	let result = Product.find(queryObject)
	if (sort) {
		const sortList = sort.split(",").join(" ")
		result = result.sort(sortList)
	}
	if (field) {
		const fieldList = field.split(",").join(" ")
		result = result.select(fieldList)
	}
	const limit = Number(req.query.limit) || 10
	const page = Number(req.query.page) || 1
	const skip = (page - 1) * limit

	result = result.limit(limit).skip(skip)

	const products = await result
	return res.status(200).json({ ProductNo: products.length, products })
}

module.exports = getAllProducts
