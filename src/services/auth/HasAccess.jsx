import React, {useEffect, useState} from 'react';
import {get, includes, isEmpty, uniq} from "lodash";
import {useStore} from "../../store";

export const hasAccess = (roleList = [], access = [],cant=[]) => {
    let hasAccessToRole = false;
    access.forEach((role)=>{
        if(includes(roleList,`${role}`)){
            hasAccessToRole = true
        }
    })
    cant.forEach((role)=>{
        if(includes(roleList,`${role}`)){
            hasAccessToRole = false
        }
    })
    return hasAccessToRole;
}
const HasAccess = ({
                       access = [],
                       can = [],
                       cant = [],
                       exceptCant = [],
                       children,
                       navigate = '',
                       DeniedComponent = () => <></>,
                       ...rest
                   }) => {
    const [roles, setRoles] = useState([]);
    // const [permissions, setPermissions] = useState([]);
    const user = useStore(state => get(state,'user',{}))

    useEffect(() => {
        if (!isEmpty(user)) {
            setRoles(get(user, 'authorities', []));
            // setPermissions(uniq(get(user, 'access.permissions', [])));
        }
    }, [user])
    // if(isEmpty(roles)){
    //     return  <OverlayLoader />
    // }
    return (
        <>
            {hasAccess(roles,access,cant) ?  children : <DeniedComponent />}
        </>
    );
};

export default HasAccess;
