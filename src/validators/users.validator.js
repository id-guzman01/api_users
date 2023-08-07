import { check } from "express-validator";
import ValidatosError from "../handleErrors/validator.handleerror"

const validateCreate = [
    check("nombre").exists()
                .isString()
                .not()
                .isEmpty(),
    check("telefono").exists()
                .isNumeric()
                .not()
                .isEmpty(),
    check("password").exists()
                .isString()
                .not()
                .isEmpty(),
    check("email").exists()
                .isEmail()
                .not()
                .isEmpty(),
    (request, response, next) => {
        ValidatosError.validateResult(request, response, next)
    }
];

module.exports = {
    validateCreate
}