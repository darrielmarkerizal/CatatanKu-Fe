"use client";

import { useState } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { CiStickyNote } from "react-icons/ci";
import { Button } from "@chakra-ui/react";
import AddEditNote from "./AddEditNote";

export default function Navbar({ onSave }) {
    const [showNoteDialog, setShowNoteDialog] = useState(false);

    return (
        <>
            <div className="p-4 shadow">
                <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
                    <Link href="/" className="flex items-center gap-1">
                        <CiStickyNote className="block" size={40} />
                        <span className="hidden font-bold sm:block">
                            CatatanKu!
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button
                            colorScheme="teal"
                            className="sm:hidden"
                            onClick={() => setShowNoteDialog(true)}
                            leftIcon={<FaPlus size={20} />}
                        />

                        <Button
                            colorScheme="teal"
                            className="hidden sm:flex"
                            onClick={() => setShowNoteDialog(true)}
                            leftIcon={<FaPlus size={20} />}
                        >
                            Tambah Catatan
                        </Button>
                    </div>
                </div>
            </div>
            <AddEditNote
                isOpen={showNoteDialog}
                type="new"
                onClose={() => setShowNoteDialog(false)}
                onSave={onSave}
            />
        </>
    );
}
