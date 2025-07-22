import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { createNote } from "../../services/noteService";
import { type Note } from "../../types/note";

interface NoteFormProps {
  onSubmitSuccess: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  content: Yup.string()
    .required("Content is required")
    .min(5, "Content must be at least 5 characters"),
  tag: Yup.string().required("Tag is required"),
});

export default function NoteForm({ onSubmitSuccess }: NoteFormProps) {
  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await createNote(values);
          resetForm();
          onSubmitSuccess();
        } catch (error) {
          console.error("Error creating note:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.field}>
            <label htmlFor="title">Title</label>
            <Field name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>
          <div className={css.field}>
            <label htmlFor="content">Content</label>
            <Field name="content" as="textarea" className={css.input} />
            <ErrorMessage
              name="content"
              component="div"
              className={css.error}
            />
          </div>
          <div className={css.field}>
            <label htmlFor="tag">Tag</label>
            <Field name="tag" type="text" className={css.input} />
            <ErrorMessage name="tag" component="div" className={css.error} />
          </div>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isSubmitting}
          >
            Create Note
          </button>
        </Form>
      )}
    </Formik>
  );
}
