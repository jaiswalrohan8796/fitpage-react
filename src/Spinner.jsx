import { Spinner, Center, Text, VStack } from "@chakra-ui/react";

import React from "react";

function SpinnerComponent() {
    return (
        <Center height="100vh" width="100vw">
            <VStack>
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.100"
                    color="gray.800"
                    size="xl"
                />
                <Text fontSize={"xl"} marginTop={"8px"}>
                    Free tier deployment. May take a while.
                </Text>
            </VStack>
        </Center>
    );
}

export default SpinnerComponent;
