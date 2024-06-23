"use server"
interface CategoryListType {
    id: string;
    title: string;
    count: string;
}
export const getCategory = async (): Promise<CategoryListType> => {
    try {
        const res = await fetch(`http://localhost:3001/categoryies`);
        const data = await res.json();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
