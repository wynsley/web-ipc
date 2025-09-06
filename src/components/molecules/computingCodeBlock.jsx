import './computingCodeBlock.css'

function ComputingCodeBlock() {
  return (
    <div className="computing-code-block">
      <div className="computing-code-block__header">
        <div className="computing-code-block__dots">
          <span className="computing-code-block__dot computing-code-block__dot--red"></span>
          <span className="computing-code-block__dot computing-code-block__dot--yellow"></span>
          <span className="computing-code-block__dot computing-code-block__dot--green"></span>
        </div>
        <span className="computing-code-block__title">main.py</span>
      </div>
      <div className="computing-code-block__content">
        <div className="computing-code-block__line">
          <span className="computing-code-block__keyword">def</span>
          <span className="computing-code-block__function"> tu_futuro</span>
          <span className="computing-code-block__bracket">()</span>
          <span className="computing-code-block__symbol">:</span>
        </div>
        <div className="computing-code-block__line computing-code-block__line--indent">
          <span className="computing-code-block__variable">carrera</span>
          <span className="computing-code-block__symbol"> = </span>
          <span className="computing-code-block__string">"Computación"</span>
        </div>
        <div className="computing-code-block__line computing-code-block__line--indent">
          <span className="computing-code-block__variable">instituto</span>
          <span className="computing-code-block__symbol"> = </span>
          <span className="computing-code-block__string">"IPC"</span>
        </div>
        <div className="computing-code-block__line computing-code-block__line--indent">
          <span className="computing-code-block__keyword">return</span>
          <span className="computing-code-block__string"> "¡Éxito garantizado!"</span>
        </div>
      </div>
    </div>
  )
}

export { ComputingCodeBlock }