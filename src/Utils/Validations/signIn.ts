import * as yup from "yup";

const signInValidations = yup.object().shape({
  email: yup.string().required("E-mail obrigatório!").email("E-mail inválido!"),
  password: yup.string().required("Senha obrigatório!"),
});

export default signInValidations;
