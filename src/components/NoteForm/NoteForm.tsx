import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onSubmitSuccess: () => void;
  onSubmit: (values: {
    title: string;
    content: string;
    tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  }) => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  content: Yup.string()
    .required("Content is required")
    .min(5, "Content must be at least 5 characters"),
  tag: Yup.string()
    .required("Tag is required")
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag"),
});

export default function NoteForm({ onSubmitSuccess, onSubmit }: NoteFormProps) {
  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        tag: "Todo" as "Todo" | "Work" | "Personal" | "Meeting" | "Shopping",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          onSubmit(values);
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
          <div className={css.formGroup}>
            <label htmlFor="note-title">Title</label>
            <Field
              id="note-title"
              name="title"
              type="text"
              className={css.input}
            />
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="note-content">Content</label>
            <Field
              id="note-content"
              name="content"
              as="textarea"
              className={css.textarea}
              rows={5}
            />
            <ErrorMessage
              name="content"
              component="div"
              className={css.error}
            />
          </div>
          <div className={css.formGroup}>
            <label htmlFor="note-tag">Tag</label>
            <Field id="note-tag" name="tag" as="select" className={css.select}>
              <option value="" disabled>
                Select a tag
              </option>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
          </div>
          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onSubmitSuccess}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              Create Note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
