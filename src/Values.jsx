import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Center,
    Flex,
    List,
    ListItem,
    Card,
    CardBody,
    VStack,
    HStack,
    FormLabel,
    Input,
    Heading,
    Text,
    Button,
} from "@chakra-ui/react";

const capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function Values({ scans }) {
    return (
        <Center height="100vh" width="100vw">
            <VStack>
                <Flex
                    justifyContent="center"
                    alignItems="start"
                    boxShadow="2xl"
                    width={"60vw"}
                    height={"60vh"}
                >
                    <h2>Hello World</h2>
                </Flex>
                <HStack marginTop={"2rem"} justify={"space-between"}>
                    <Button
                        colorScheme="purple"
                        variant="outline"
                        onClick={() => navigate(-1)}
                    >
                        Backward
                    </Button>
                    <Button
                        colorScheme="purple"
                        variant="outline"
                        onClick={() => navigate(1)}
                    >
                        Forward
                    </Button>
                </HStack>
            </VStack>
        </Center>
    );
}

export default Values;
