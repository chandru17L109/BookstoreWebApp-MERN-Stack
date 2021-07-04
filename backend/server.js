const express = require('express')
const app = express()
const colors = require('colors')
const cors = require('cors')
require('dotenv').config()
const fileupload = require('express-fileupload')

const {
	notFound_1,
	errorHandler_1,
} = require('./team1/middleware/errorMiddleware')

const {
	notFound_5,
	errorHandler_5,
} = require('./team5/middleware/errorMiddleware')

const errorHandler = require('./team4/middleware/errorhandler')

const searchpageRoute = require('./team4/routes/newsearch')
const wishlistRoute = require('./team4/routes/wishlist')
const cartlistRoute = require('./team4/routes/cart')

const userRoutes = require('./team1/routes/userRoutes')

// const productRoutes = require('./team2/routes/product')
const cartItemRoutes = require('./team2/routes/cartItem')
const wishItemRoutes = require('./team2/routes/wishItem')
const addressRoutes = require('./team2/routes/address')
const orderRoutes = require('./team2/routes/order')

// const reviewRoutes = require('./team5/routes/review')

// const fileupload = require('express-fileupload')

// app.use('/dp', express.static('backend/public/uploads'))

const connectToDatabase = require('./db')

app.use(cors())

app.use(express.json())

connectToDatabase()

app.use(fileupload())
app.use('/dp', express.static('team1/public/uploads'))

app.use('/books', searchpageRoute)
app.use('/api/wishlist', wishlistRoute)
app.use('/api/cartlist', cartlistRoute)

// app.use('/api/v1/products', productRoutes)
app.use('/api/v1/cartItems', cartItemRoutes)
app.use('/api/v1/wishItems', wishItemRoutes)
app.use('/api/v1/addresses', addressRoutes)
app.use('/api/v1/orders', orderRoutes)

app.use(errorHandler)

// app.use(fileupload())

app.use('/api/users', userRoutes)

app.use(notFound_1)
app.use(errorHandler_1)

// app.use('/api/bookreview', reviewRoutes)

// app.use(notFound_5)
// app.use(errorHandler_5)

const PORT = process.env.PORT || 8080

app.listen(
	PORT,
	console.log(
		`listening in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
			.yellow.bold
	)
)

// app.listen(4000, ()=> console.log('listening on port 4000'))
