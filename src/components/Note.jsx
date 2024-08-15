"use client";

import { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Text,
    Button,
    Flex,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

export default function Note({
    title,
    datetime,
    body,
    onClick,
    onEdit,
    onDelete,
    onView,
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Card
                className="cursor-pointer transition-shadow"
                style={{ height: "300px" }}
                bg="white"
                boxShadow="md"
                _hover={{ boxShadow: "xl" }}
                borderRadius="md"
                overflow="hidden"
            >
                <CardHeader bg="teal.500" color="white" p={4}>
                    <Heading size="md" noOfLines={1} mb="0.5">
                        {title}
                    </Heading>
                    <Text fontSize="xs" mb="0.5">
                        {datetime}
                    </Text>
                </CardHeader>
                <CardBody pt="1" p={4}>
                    <Text noOfLines={4} fontSize="sm">
                        {body}
                    </Text>
                </CardBody>
                <CardFooter
                    bg="gray.100"
                    p={4}
                    display="flex"
                    justifyContent="space-between"
                >
                    <Button size="sm" colorScheme="blue" onClick={onOpen}>
                        Lihat
                    </Button>
                    <Flex gap={2}>
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
                </CardFooter>
            </Card>

            <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent borderRadius="lg" overflow="hidden">
                    <ModalHeader bg="teal.500" color="white" py={4}>
                        {title}
                    </ModalHeader>
                    <ModalCloseButton color="white" />
                    <ModalBody p={6} bg="gray.50">
                        <Text fontSize="lg" color="gray.600" mb={4}>
                            {datetime}
                        </Text>
                        <Text fontSize="md" color="gray.800">
                            {body}
                        </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
