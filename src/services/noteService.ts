import axios from "axios";

const noteApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  data: Note[];
  totalPages: number;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export async function fetchNotes(
  page: number = 1,
  perPage: number = 12,
  search: string = ""
): Promise<FetchNotesResponse> {
  try {
    const response = await noteApi.get<FetchNotesResponse>("/notes", {
      params: {
        page,
        perPage,
        search,
      },
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
