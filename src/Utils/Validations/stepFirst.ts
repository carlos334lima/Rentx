import * as yup from "yup";

const schemaStepFirst = yup.object().shape({
  driverLicense: yup.string().required('CNH obrigatória'),
  email: yup.string().required("E-mail obrigatório!").email("E-mail inválido!"),
  name: yup.string().required("E-mail obrigatório!"),
});

export default schemaStepFirst;
