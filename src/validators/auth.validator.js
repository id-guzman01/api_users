import { check } from "express-validator";
import validatorHandleError from "../handleErrors/validator.handleerror";

const validateCreate = [
    check("email").exists()
                .isEmail()
                .not()
                .isEmpty(),
    check("password").exists()
                .isString()
                .not()
                .isEmpty(),
    (request, response, next) => {
        validatorHandleError.validateResult(request, response, next);
    }
];

module.exports = {
    validateCreate
}