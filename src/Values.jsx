import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
    useStatStyles,
} from "@chakra-ui/react";

const capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function Values({ scans }) {
    const { scan_id, crit_id, var_id } = useParams();
    let scan = scans.filter((scan) => {
        return scan.id === Number(scan_id);
    })[0];
    let var_key = `$${var_id}`;
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
            <Flex
                justifyContent="center"
                alignItems="start"
                boxShadow="2xl"
                minW={{ base: "60%", md: "40%", sm: "60%" }}
                minH={{ base: "50%", md: "50%", sm: "60%" }}
            >
                {renderElement}
            </Flex>
        </Center>
    );
}

export default Values;
