import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";

const CreateEvent = (props: any) => {

    const [error, setError] = useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();
    const onSubmit = async (event: any) => {
        event.date = new Date(event.date)
        try {
            let res = await axios.post('/api/events', event);
            if (res) {
                reset({ title: '', date: null });
            }
        } catch (error: any) {
            setError(error.message)
        }
    };
    return (
        <div className="z-10  w-full items-center font-mono text-sm">
            {/* show server error */}
            {error && <div className="rounded  border border-red-600 bg-red-50 p-1 text-red-600">
                {error}
            </div>}
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                Create Event
            </p>
            {/* Create Event Form */}
            <div
                className={
                    'flex  p-6 bg-white border border-gray-200 dark:border-gray-700 rounded-lg  shadow dark:bg-gray-800'
                }>
                <form onSubmit={handleSubmit(onSubmit)} className="flex w-full dark:text-white flex-col gap-2 rounded-lg  p-8 text-neutral-900 shadow">
                    <label htmlFor="card-name">Event Title</label>
                    <input
                        className="rounded border dark:border-gray-700 dark:bg-gray-700 p-1"
                        type="text"
                        {...register('title', {
                            required: { value: true, message: 'title Required' },
                            minLength: { value: 3, message: 'atleaste 3 charactors required' }
                        })}
                    />
                    {errors.title ? <>{errors?.title?.message}</> : <></>}

                    <label htmlFor="card-expiry">Date</label>
                    <input
                        className="rounded border dark:border-gray-700 dark:bg-gray-700 p-1"
                        type="datetime-local"
                        {...register('date')}
                    />
                    <Button color="primary" type='submit'>
                        Button
                    </Button>
                    {/* <input role="button" type='submit' className="mt-5 rounded bg-green-500 p-2 text-neutral-50" /> */}

                </form>
            </div>

        </div>
    )
}

export default CreateEvent
