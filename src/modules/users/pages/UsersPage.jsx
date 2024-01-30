import UsersContainer from "../containers/UsersContainer.jsx";
import HasAccess from "../../../services/auth/HasAccess";
import config from "../../../config";

const UsersPage = () => {
  return <HasAccess access={[config.ROLES.ADMIN]}><UsersContainer /></HasAccess>
}
export default UsersPage;
