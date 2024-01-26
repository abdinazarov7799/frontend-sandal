import {Box} from "@chakra-ui/react";
import React from "react";
import UserRoleList from "../components/UserRoleList";
import RoleList from "../components/RoleList";

const RolesContainer = () => {

  return(
      <>
          <Box bg="white" w="100%" p={4} mb={4} borderRadius="md">
              <UserRoleList />
          </Box>
          <Box bg="white" w="100%" p={4} borderRadius="md">
              <RoleList />
          </Box>
      </>
  )
}
export default RolesContainer