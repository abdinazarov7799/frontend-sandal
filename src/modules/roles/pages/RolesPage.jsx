import RolesContainer from "../containers/RolesContainer";
import HasAccess from "../../../services/auth/HasAccess";
import config from "../../../config";


const RolesPage = () => {
  return <HasAccess access={[config.ROLES.ROLE_ADMIN]}><RolesContainer /></HasAccess>
}
export default RolesPage;