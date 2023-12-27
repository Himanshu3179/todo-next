"use client"
import { Button } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


export default function Calander() {
    const router = useRouter()
    const [value, onChange] = useState<Value>(new Date());
    const [hide, setHide] = useState(false);
    const searchParams = useSearchParams()
    const search = searchParams.get('status');
    const timestamp = value?.valueOf();


    useEffect(() => {
        if (search) {
            router.push(`/todos?status=${search}&date=${timestamp}`)
        }
        else {
            router.push(`/todos?date=${timestamp}`)
        }
    }, [router, search, timestamp])


    return (
        <div className="mb-5 text-right ">
            <Button className="  justify-center items-center align-middle text-center"
                color='gray'
                onClick={() => {
                    setHide(!hide)
                }}
            >
                {hide ? 'Show ' : 'Hide '}Calander
            </Button>
            <div className={`w - [300px] mx - auto shadow - lg
                ${hide ? 'hidden' : ''}
                `}>
                <Calendar onChange={onChange} value={value} />
            </div>
        </div>

    );
}
