import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SpinnerComponent from "./Spinner";
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

function Values() {
    let navigate = useNavigate();
    const { scan_id, crit_id, var_id } = useParams();
    let [scans, setScans] = useState([]);
    let [isLoading, setLoading] = useState(true);
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        fetch(VITE_BACKEND_URL)
            .then((response) => response.json())
            .then((data) => {
                setScans(data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(true);
            });
    }, []);
    if (isLoading) {
        return <SpinnerComponent />;
    }
    let scan = scans.filter((scan) => {
        return scan.id === Number(scan_id);
    })[0];
    let var_key = `$${var_id}`;
    console.log(var_key);
    let variable = scan.criteria[Number(crit_id)].variable[var_key];
    let renderElement = null;
    if (variable.type === "value") {
        let variable_elements = variable.values.map((val, idx) => {
            return (
                <ListItem key={idx}>
                    <Card
                        width="100%"
                        borderBottom="1px"
                        borderBottomColor="gray.300"
                        _hover={{ backgroundColor: "gray.100" }}
                    >
                        <CardBody>{val}</CardBody>
                    </Card>
                </ListItem>
            );
        });
        renderElement = <List width="100%">{variable_elements}</List>;
    } else if (variable.type == "indicator") {
        let [param, setParam] = useState(variable.default_value);
        renderElement = null;
        let indicator_element = (
            <VStack width={"100%"}>
                <Card
                    width="100%"
                    borderBottom="2px"
                    borderBottomColor="gray.300"
                    backgroundColor={"purple.500"}
                >
                    <CardBody>
                        <Heading size={{ base: "sm", md: "md" }}>
                            {variable.study_type.toUpperCase()}
                        </Heading>
                        <Text>Set Parameters</Text>
                    </CardBody>
                </Card>
                <HStack
                    justify={"space-around"}
                    alignItems={"center"}
                    marginTop={"8px"}
                >
                    <FormLabel>
                        {capitalizeFirstLetter(variable.parameter_name)}
                    </FormLabel>
                    <Input
                        type="text"
                        value={param}
                        focusBorderColor={"purple.500"}
                        onChange={(e) => setParam(e.target.value)}
                    ></Input>
                </HStack>
            </VStack>
        );
        renderElement = indicator_element;
    }

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
                    {renderElement}
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
