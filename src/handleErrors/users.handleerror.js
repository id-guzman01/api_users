const userError = (response, error) => {
    console.log(error.message);
    response.status(500);
    response.send({
        status: 500,
        error: "Bad request",
        message: error.message
    });
};

module.exports = {
    userError
}