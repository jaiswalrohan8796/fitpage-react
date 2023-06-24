import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    Center,
    Flex,
    List,
    ListItem,
    Card,
    CardBody,
    Heading,
    Badge,
    Button,
    VStack,
    HStack,
} from "@chakra-ui/react";

function makeCriteriaTextFromVariable(criteria, idx, scan) {
    for (let variable_key in criteria.variable) {
        let variable_value = "";
        if (criteria.variable[variable_key].type === "value") {
            variable_value = criteria.variable[variable_key].values[0];
        } else if (criteria.variable[variable_key].type === "indicator") {
            variable_value = criteria.variable[variable_key].default_value;
        }
        let anchor_style = {
            color: "blue",
            textDecoration: "none",
        };
        criteria.text = criteria.text.replace(
            variable_key,
            `<a href="/scan/${scan.id}/${idx}/${variable_key.slice(
                1,
                2
            )}"   style="color:blue"}>${variable_value}</a>`
        );
    }
    return criteria.text;
}

function Scan({ scans }) {
    let navigate = useNavigate();
    let { scan_id } = useParams();
    let scan = scans.filter((scan) => {
        return scan.id === Number(scan_id);
    })[0];
    let criteriaList = scan.criteria.map((criteria, idx) => {
        let criteriaText = criteria.text;
        let renderThisString = null;
        if (criteria.type === "plain_text") {
            renderThisString = (
                <Heading size={{ base: "sm", md: "md" }}>
                    {criteriaText}
                </Heading>
            );
            return (
                <ListItem key={idx}>
                    <Card
                        width="100%"
                        borderBottom="2px"
                        borderBottomColor="gray.300"
                        _hover={{ backgroundColor: "gray.100" }}
                    >
                        <CardBody>{renderThisString}</CardBody>
                    </Card>
                </ListItem>
            );
        } else if (criteria.type === "variable") {
            criteriaText = makeCriteriaTextFromVariable(criteria, idx, scan);
            renderThisString = (
                <Heading
                    size={{ base: "sm", md: "md" }}
                    dangerouslySetInnerHTML={{ __html: criteriaText }}
                ></Heading>
            );
        }
        return (
            <ListItem key={idx}>
                <Card
                    width="100%"
                    borderBottom="2px"
                    borderBottomColor="gray.300"
                    _hover={{ backgroundColor: "purple.100" }}
                >
                    <CardBody>{renderThisString}</CardBody>
                </Card>
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
                    width={"60vw"}
                    height={"60vh"}
                >
                    <VStack width={"100%"}>
                        <Card
                            width="100%"
                            borderBottom="2px"
                            borderBottomColor="gray.300"
                            backgroundColor={"purple.500"}
                        >
                            <CardBody>
                                <Heading size={{ base: "sm", md: "md" }}>
                                    {scan.name}
                                </Heading>
                                <Badge colorScheme={scan.color}>
                                    {scan.tag}
                                </Badge>
                            </CardBody>
                        </Card>
                        <List width="100%">{criteriaList}</List>
                    </VStack>
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

export default Scan;
