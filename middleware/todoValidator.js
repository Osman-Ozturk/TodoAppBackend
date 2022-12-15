import { body } from 'express-validator';

const todoValidator = [
        body('todo')
          .notEmpty()
          .withMessage('Todo muss angegeben werden')
          .isAlpha('de-DE',{ignore:" -"})
          .withMessage('Todo enthält unzulassige Zeichen')
          .trim(),
        body('deadline')
          .notEmpty()
          .withMessage('Deadline muss angegeben werden')
          .trim()  
]

export {todoValidator}