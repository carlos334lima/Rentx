import * as yup from "yup";

const schemaStepSecond = yup.object().shape({
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguais."),
  password: yup
    .string()
    .min(5, "A senha deve conter no mínimo 5 caracteres")
    .required("Senha é obrigatório"),
});

export default schemaStepSecond;
