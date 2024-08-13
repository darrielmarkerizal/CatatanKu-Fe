"use client";

import { useState } from "react";
import { Card, CardHeader, CardBody, Heading, Text } from "@chakra-ui/react";

export default function Note({ title, datetime, body, onClick }) {
    const [showEditDialog, setShowEditDialog] = useState(false);

    return (
        <>
            <Card
                className="cursor-pointer transition-shadow"
                style={{ height: "200px" }}
                onClick={onClick}
            >
                <CardHeader>
                    <Heading size="md" noOfLines={1} mb="1">
                        {title}
                    </Heading>
                    <Text fontSize="xs" mb="1">
                        {datetime}
                    </Text>
                </CardHeader>
                <CardBody pt="1">
                    <Text noOfLines={4} fontSize="sm">
                        {body}
                    </Text>
                </CardBody>
            </Card>
        </>
    );
}
