import { check } from "express-validator";
import { validateResult } from "../utils/validators.utils.js";


const validateUserCreate =[
    
    check('Nom_User').exists().not().isEmpty().isString(),
    check('Ape_User').exists().not().isEmpty().isString(),
    check('Ema_User').exists().not().isEmpty().isString(),
    check('Pass_User').exists().not().isEmpty().isString(),
    check('Dir_Ip').exists().not().isEmpty().isString(),

    (req,res,next)=>{
        validateResult(req,res,next);
    }
]

export default validateUserCreate;
