"use client";
import { useDictionary } from '@/provider/dictionary-provider';
import * as React from 'react';

export default function Contact() {

    const dict = useDictionary();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const name = form.name.value;
        const message = form.message.value;

        // Basic sanitization to avoid JS injection
        const sanitizeInput = (input: string) => {
            const div = document.createElement('div');
            div.innerText = input;
            return div.innerHTML;
        };

        const sanitizedMessage = `
            Name: ${sanitizeInput(name)}\n
            Nachricht: ${sanitizeInput(message)}
        `;

        window.location.href = `mailto:test@bn-project.de?subject=Contact Form Submission&body=${encodeURIComponent(sanitizedMessage)}`;
    };
    if (!dict) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full h-full text-slate-800 bg-white pl-[285px] pt-[50px]">
            <div className="mx-auto pl-4 border-l border-slate-700 ">
                <h2 className="text-2xl font-bold mb-4">{dict.CONTACT_TITLE}</h2>

                <div className="bg-slate-100 p-4 overflow-x-auto mb-4  w-[70%]">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                                {dict.CONTACT_NAME_LABEL}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full px-3 py-2 border border-slate-300"
                                pattern="[A-Za-z\s]{1,50}"
                                title="Name should only contain letters and spaces, and be up to 50 characters long."
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                {dict.CONTACT_EMAIL_LABEL}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full px-3 py-2 border border-slate-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                                {dict.CONTACT_MESSAGE_LABEL}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="mt-1 block w-full px-3 py-2 border border-slate-300"
                                required
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-800"
                            >
                                {dict.CONTACT_SEND_BUTTON}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="my-2 font-bold">{dict.CONTACT_NOTE}</p>
            </div>
        </div>
    );
}