import {Box} from "@chakra-ui/react";
import React from "react";
import BranchList from "../components/BranchList";
import UserList from "../components/UserList.jsx";

const UsersContainer = () => {

  return(
      <>
          <Box bg="white" w="100%" p={4} mb={4} borderRadius="md">
              <UserList />
          </Box>
          <Box bg="white" w="100%" p={4} borderRadius="md">
              <BranchList />
          </Box>
      </>
  )
}
export default UsersContainer
