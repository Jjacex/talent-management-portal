const errorHandler = (error, req, res, next) => {
    console.log('hit')
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.render('errorPage.ejs', {message: error.message})
}

module.exports = errorHandler