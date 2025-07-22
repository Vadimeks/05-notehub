import axios from "axios";
import { type Note } from "../types/note";

const noteApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  page: number = 1,
  perPage: number = 10,
  search: string = ""
): Promise<FetchNotesResponse> {
  try {
    const params: { page: number; perPage: number; search?: string } = {
      page,
      perPage,
    };
    if (search.trim()) {
      params.search = search.trim();
    }
    const response = await noteApi.get<FetchNotesResponse>("/notes", {
      params,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error fetching notes:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    } else {
      console.error("Unexpected error fetching notes:", error);
    }
    throw new Error("Failed to fetch notes");
  }
}

export async function createNote(note: Omit<Note, "id">): Promise<Note> {
  try {
    const response = await noteApi.post<Note>("/notes", note);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error creating note:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    } else {
      console.error("Unexpected error creating note:", error);
    }
    throw new Error("Failed to create note");
  }
}

export async function deleteNote(id: string): Promise<Note> {
  try {
    const response = await noteApi.delete<Note>(`/notes/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error deleting note:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    } else {
      console.error("Unexpected error deleting note:", error);
    }
    throw new Error("Failed to delete note");
  }
}
