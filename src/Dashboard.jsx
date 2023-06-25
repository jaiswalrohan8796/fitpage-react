import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    SunIcon,
    MoonIcon,
    ArrowBackIcon,
    ArrowForwardIcon,
} from "@chakra-ui/icons";
import {
    Center,
    Flex,
    List,
    ListItem,
    Badge,
    Card,
    CardBody,
    Heading,
    HStack,
    Button,
    VStack,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";

function Dashboard({ scans }) {
    let navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    let scanList = scans.map((scan) => {
        return (
            <ListItem key={scan.id}>
                <Link to={`/scan/${scan.id}`}>
                    <Card
                        width="100%"
                        borderBottom="2px"
                        borderBottomColor="purple.200"
                        _hover={{ backgroundColor: "purple.400" }}
                    >
                        <CardBody>
                            <Heading size={{ base: "sm", md: "md" }}>
                                {scan.name}
                            </Heading>
                            <Badge colorScheme={scan.color}>{scan.tag}</Badge>
                        </CardBody>
                    </Card>
                </Link>
            </ListItem>
        );
    });
    return (
        <Center height="100vh" width="100vw">
            <VStack>
                <Flex
                    justifyContent="center"
                    alignItems="start"
                    boxShadow="2xl"
                    width={{ base: "80vw", md: "60vw" }}
                    height={{ base: "60vh", md: "60vh" }}
                >
                    <List width="100%">{scanList}</List>
                </Flex>
                <HStack marginTop={"2rem"} justify={"space-between"}>
                    <Button
                        variant="outline"
                        colorScheme="purple"
                        leftIcon={
                            colorMode == "light" ? <SunIcon /> : <MoonIcon />
                        }
                        onClick={toggleColorMode}
                    >
                        {colorMode}
                    </Button>
                    <Button
                        leftIcon={<ArrowBackIcon />}
                        colorScheme="purple"
                        variant="outline"
                        onClick={() => navigate(-1)}
                    >
                        Exit
                    </Button>
                    <Button
                        rightIcon={<ArrowForwardIcon />}
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

export default Dashboard;
