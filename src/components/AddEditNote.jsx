"use client";

import { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Heading,
    Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddEditNote({ isOpen, onClose, type }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const router = useRouter();

    const handleSave = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/notes`,
                {
                    title,
                    body,
                }
            );
            onClose();
        } catch (error) {
            console.error("Error saving note:", error);
        }
    };

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Heading size="md">
                            {type == "new"
                                ? "Tambah Catatan"
                                : "Tinjau Catatan"}
                        </Heading>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Judul Catatan</FormLabel>
                            <Input
                                placeholder="Masukkan judul catatan"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Catatan</FormLabel>
                            <Textarea
                                placeholder="Masukkan catatan"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3}>
                            Tutup
                        </Button>
                        <Button colorScheme="blue" onClick={handleSave}>
                            Simpan Catatan
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
