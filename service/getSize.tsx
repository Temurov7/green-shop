"use server"
interface TypeSize {
    id: string;
    title: string;
    count: string;
}
export const getSize = async (): Promise<TypeSize> => {
    try {
        const res = await fetch(`http://localhost:3001/sizes`);
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
