import css from "./App.module.css";

export default function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button className={css.button}>Create note +</button>
      </header>
    </div>
  );
}
