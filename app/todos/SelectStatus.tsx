"use client"
import { Button } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const statuses = [
    { label: 'All', value: 'All', color: 'gray' },
    { label: 'Open', value: 'Open', color: 'red' },
    { label: 'In Progress', value: 'InProgress', color: 'yellow' },
    { label: 'Done', value: 'Done', color: 'green' },
];

type color = 'gray' | 'red' | 'yellow' | 'green';
type statusType = 'All' | 'Open' | 'InProgress' | 'Done';

export default function SelectStatus() {
    const router = useRouter();
    const [selectedStatus, setSelectedStatus] = useState('All');

    useEffect(() => {
        router.refresh();
    }, [selectedStatus, router]);

    const handleButtonClick = ({ status }: { status: statusType }) => {
        setSelectedStatus(status);
        const url = `/todos${status === 'All' ? '' : `?status=${status}`}`
        console.log(url);
        router.push(url);
    };

    return (
        <div className='grid gap-2 grid-cols-2 sm:grid-cols-4'>
            {statuses.map(({ label, value, color }) => (
                <Button
                    key={value}
                    color={color as color}
                    disabled={selectedStatus === value}
                    onClick={() => handleButtonClick({ status: value as statusType })}
                >
                    {label}
                </Button>
            ))}
        </div>
    );
}