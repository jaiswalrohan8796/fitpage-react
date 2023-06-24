import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";

function Dashboard({ scans }) {
    let navigate = useNavigate();
    let scanList = scans.map((scan) => {
        return (
            <ListItem key={scan.id}>
                <Link to={`/scan/${scan.id}`}>
                    <Card
                        width="100%"
                        borderBottom="2px"
                        borderBottomColor="gray.300"
                        _hover={{ backgroundColor: "purple.100" }}
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
            <VStack width={"100%"}>
                <Flex
                    justifyContent="center"
                    alignItems="start"
                    boxShadow="2xl"
                    minW={{ base: "60%", md: "40%", sm: "60%" }}
                    minH={{ base: "50%", md: "50%", sm: "60%" }}
                >
                    <List width="100%">{scanList}</List>
                </Flex>
                <HStack marginTop={"2rem"} justify={"space-between"}>
                    <Button
                        colorScheme="purple"
                        variant="outline"
                        onClick={() => navigate(-1)}
                    >
                        Exit
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

export default Dashboard;
