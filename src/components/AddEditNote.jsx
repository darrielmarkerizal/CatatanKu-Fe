"use client";

import { useState, useEffect } from "react";
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
    Spinner,
    useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddEditNote({ isOpen, onClose, type, note, onSave }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        if (type === "edit" && note) {
            setTitle(note.title);
            setBody(note.body);
        } else {
            setTitle("");
            setBody("");
        }
    }, [note, type, isOpen]);

    const handleSave = async () => {
        if (!title || !body) {
            toast({
                title: "Error",
                description: "Kedua field harus diisi",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        try {
            if (type === "new") {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
                    title,
                    body,
                });
                toast({
                    title: "Success",
                    description: "Catatan berhasil ditambahkan.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else if (type === "edit" && note) {
                await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}/notes/${note.id}`,
                    {
                        title,
                        body,
                    }
                );
                toast({
                    title: "Success",
                    description: "Catatan berhasil diperbarui.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            }

            // Call the onSave callback to refresh the list of notes
            if (onSave) onSave();
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Terjadi kesalahan saat menyimpan catatan.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
            onClose(); // Close the modal whether the operation is successful or not
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <Modal onClose={handleClose} isOpen={isOpen} isCentered size="xl">
                <ModalOverlay backdropFilter="blur(10px)" />
                <ModalContent>
                    <ModalHeader>
                        <Heading size="md">
                            {type === "new" ? "Tambah Catatan" : "Edit Catatan"}
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
                        <Button onClick={handleClose} mr={3}>
                            Tutup
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={handleSave}
                            isLoading={isLoading}
                            disabled={isLoading || !title || !body}
                        >
                            {isLoading ? (
                                <Spinner size="sm" />
                            ) : (
                                "Simpan Catatan"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
