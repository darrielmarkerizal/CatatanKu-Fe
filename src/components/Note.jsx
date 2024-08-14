"use client";

import { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    Button,
    Flex,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

export default function Note({
    title,
    datetime,
    body,
    onClick,
    onEdit,
    onDelete,
}) {
    return (
        <>
            <Card
                className="cursor-pointer transition-shadow"
                style={{ height: "200px" }}
                onClick={onClick}
                bg="white"
                boxShadow="md"
                _hover={{ boxShadow: "xl" }}
                borderRadius="md"
                overflow="hidden"
            >
                <CardHeader
                    bg="teal.500"
                    color="white"
                    p={4}
                    position="relative"
                >
                    <Heading size="md" noOfLines={1} mb="0.5">
                        {title}
                    </Heading>
                    <Text fontSize="xs" mb="0.5">
                        {datetime}
                    </Text>
                    <Flex position="absolute" top="4" right="4" gap={2}>
                        <Button
                            size="sm"
                            colorScheme="yellow"
                            onClick={onEdit}
                            leftIcon={<EditIcon />}
                        >
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            colorScheme="red"
                            onClick={onDelete}
                            leftIcon={<DeleteIcon />}
                        >
                            Delete
                        </Button>
                    </Flex>
                </CardHeader>
                <CardBody pt="1" p={4}>
                    <Text noOfLines={4} fontSize="sm">
                        {body}
                    </Text>
                </CardBody>
            </Card>
        </>
    );
}
