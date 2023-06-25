import { Spinner, Center, Text, VStack } from "@chakra-ui/react";

import React from "react";

function ErrorComponent({ error }) {
    return (
        <Center height="100vh" width="100vw">
            <VStack>
                <Text fontSize={"xl"} marginTop={"8px"}>
                    {error}
                </Text>
            </VStack>
        </Center>
    );
}

export default ErrorComponent;
