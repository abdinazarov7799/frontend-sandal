import React from 'react';
import {Skeleton, SkeletonCircle, SkeletonText, Stack} from '@chakra-ui/react'

const ContentLoader = ({...rest}) => {
    return (
        <Stack>
            <Skeleton height='30px' />
            <Skeleton height='30px' />
            <Skeleton height='30px' />
            <Skeleton height='30px' />
            <Skeleton height='30px' />
            <Skeleton height='30px' />
            <Skeleton height='30px' />
            <Skeleton height='30px' />
            <Skeleton height='30px' />
            <Skeleton height='30px' />
            <Skeleton height='30px' />
            <Skeleton height='30px' />
        </Stack>
    );
};

export default ContentLoader;