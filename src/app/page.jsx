"use client";

import axios from "axios";
import {
    SimpleGrid,
    InputGroup,
    Input,
    InputLeftElement,
    Icon,
    Button,
    Box,
    Heading,
    Center,
    Text,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Select,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Search } from "lucide-react";
import AddEditNote from "@/components/AddEditNote";
import Navbar from "@/components/Navbar";
import { useState, useEffect, useRef } from "react";
import Note from "@/components/Note";

export default function Home() {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showNoteDialog, setShowNoteDialog] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [deleteNoteId, setDeleteNoteId] = useState(null);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPreviousPage, setHasPreviousPage] = useState(false);
    const [sortBy, setSortBy] = useState("datetime");
    const cancelRef = useRef();

    const fetchNotes = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/notes`,
                {
                    params: { page, limit, sortBy },
                }
            );
            setHasNextPage(response.data.hasNextPage);
            setHasPreviousPage(response.data.hasPreviousPage);
            setNotes(response.data.notes);
            setFilteredNotes(response.data.notes);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [page, sortBy]);

    useEffect(() => {
        if (searchQuery) {
            setFilteredNotes(
                notes.filter(
                    (note) =>
                        note.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        note.body
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredNotes(notes);
        }
    }, [searchQuery, notes]);
    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/notes/${deleteNoteId}`
            );
            fetchNotes();
            setDeleteDialogOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <main className="m-auto max-w-7xl p-4">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    mt={4}
                    mb={4}
                >
                    <Input
                        placeholder="Search notes"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        width="200px"
                        ml={2}
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="title-a-z">Title A-Z</option>
                        <option value="title-z-a">Title Z-A</option>
                    </Select>
                </Box>

                {notes.length === 0 ? (
                    <Center flexDirection="column" mt={10} textAlign="center">
                        <Heading mb={4}>Belum Ada Catatan</Heading>
                        <Text mb={4}>
                            Catatan pertama belum ada? Yuk tambahkan catatan
                        </Text>
                        <Button
                            colorScheme="teal"
                            onClick={() => setShowNoteDialog(true)}
                        >
                            Tambah Catatan
                        </Button>
                    </Center>
                ) : (
                    <>
                        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                            {filteredNotes.map((note) => (
                                <Note
                                    key={note.id}
                                    title={note.title}
                                    datetime={formatDate(note.createdAt)}
                                    body={note.body}
                                    onEdit={() => {
                                        setCurrentNote(note);
                                        setShowNoteDialog(true);
                                    }}
                                    onDelete={() => {
                                        setDeleteNoteId(note.id);
                                        setDeleteDialogOpen(true);
                                    }}
                                />
                            ))}
                        </SimpleGrid>

                        <Box
                            display="flex"
                            justifyContent="center"
                            mt={4}
                            gap={2}
                        >
                            <Button
                                leftIcon={<ChevronLeftIcon />}
                                colorScheme="teal"
                                variant="outline"
                                onClick={() =>
                                    setPage((prev) => Math.max(prev - 1, 1))
                                }
                                disabled={!hasPreviousPage}
                            >
                                Previous
                            </Button>
                            <Button
                                rightIcon={<ChevronRightIcon />}
                                colorScheme="teal"
                                variant="solid"
                                onClick={() => setPage((prev) => prev + 1)}
                                disabled={!hasNextPage}
                            >
                                Next
                            </Button>
                        </Box>
                    </>
                )}

                <AddEditNote
                    isOpen={showNoteDialog}
                    type={currentNote ? "edit" : "new"}
                    note={currentNote}
                    onClose={() => {
                        setShowNoteDialog(false);
                        setCurrentNote(null);
                    }}
                    onSave={() => fetchNotes()}
                />

                <AlertDialog
                    isCentered
                    isOpen={isDeleteDialogOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={() => setDeleteDialogOpen(false)}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Hapus Catatan
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Apakah Anda yakin ingin menghapus catatan ini?
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button
                                    ref={cancelRef}
                                    onClick={() => setDeleteDialogOpen(false)}
                                >
                                    Batalkan
                                </Button>
                                <Button
                                    colorScheme="red"
                                    onClick={handleDelete}
                                    ml={3}
                                >
                                    Hapus
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </main>
        </>
    );
}
