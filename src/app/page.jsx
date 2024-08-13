"use client";

import Note from "@/components/Note";
import { useEffect, useState } from "react";
import axios from "axios";
import { SimpleGrid } from "@chakra-ui/react";
import AddEditNote from "@/components/AddEditNote";

export default function Home() {
    const [notes, setNotes] = useState([]);
    const [showNoteDialog, setShowNoteDialog] = useState(false);

    const fetchNotes = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/notes`
            );
            setNotes(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const formatDate = (dateString) => {
        const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        return new Intl.DateTimeFormat("id-ID", options).format(
            new Date(dateString)
        );
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <>
            <SimpleGrid columns={[2, null, 3]} spacing="24px">
                {notes.map((note) => (
                    <Note
                        key={note.id}
                        title={note.title}
                        datetime={formatDate(note.createdAt)}
                        body={note.body}
                        onClick={() => setShowNoteDialog(true)}
                    />
                ))}
            </SimpleGrid>

            <AddEditNote
                isOpen={showNoteDialog}
                type="edit"
                onClose={() => setShowNoteDialog(false)}
            />
        </>
    );
}
