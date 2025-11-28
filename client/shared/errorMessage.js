import core from "../styles/modules/Core.module.scss";

const ErrorMessage = ({ message }) => {
  return <p className={core.app_error_msg}>{message}</p>;
}

export default ErrorMessage;