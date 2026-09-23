import StudyWorkspace from "@/components/study/StudyWorkspace";

export default function StudyPage() {
  return (
    <section className="study-page">
      <header className="study-hero">
        <span className="eyebrow">
          RESEARCH WORKSPACE
        </span>

        <h1>
          Construa sua coleção
          científica.
        </h1>

        <p>
          Salve organismos e registros
          fósseis encontrados durante
          sua exploração, acrescente
          observações, compare
          evidências e exporte os dados
          para análise externa.
        </p>
      </header>

      <div className="study-method-note">
        <span>
          ARMAZENAMENTO
        </span>

        <p>
          A versão atual do workspace
          utiliza armazenamento local
          do navegador. Os dados não
          são sincronizados entre
          computadores ou navegadores.
        </p>
      </div>

      <StudyWorkspace />
    </section>
  );
}