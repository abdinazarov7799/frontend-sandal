import RequestsContainer from "../containers/RequestsContainer.jsx";
import HasAccess from "../../../services/auth/HasAccess.jsx";
import config from "../../../config.js";

const RequestsPage = () => {
  return <HasAccess access={[config.ROLES.ADMIN]}><RequestsContainer /></HasAccess>
}
export default RequestsPage
