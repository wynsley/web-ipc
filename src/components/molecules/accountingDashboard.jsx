import './accountingDashboard.css'

function AccountingDashboard() {
  return (
    <div className="accounting-dashboard">
      <div className="accounting-dashboard__header">
        <div className="accounting-dashboard__dots">
          <span className="accounting-dashboard__dot accounting-dashboard__dot--red"></span>
          <span className="accounting-dashboard__dot accounting-dashboard__dot--yellow"></span>
          <span className="accounting-dashboard__dot accounting-dashboard__dot--green"></span>
        </div>
        <span className="accounting-dashboard__title">Estado Financiero</span>
      </div>
      
      <div className="accounting-dashboard__content">
        <div className="accounting-dashboard__section">
          <div className="accounting-dashboard__section-title">ACTIVOS</div>
          <div className="accounting-dashboard__item">
            <span className="accounting-dashboard__label">Efectivo</span>
            <span className="accounting-dashboard__value">S/ 45,200</span>
          </div>
          <div className="accounting-dashboard__item">
            <span className="accounting-dashboard__label">Cuentas por Cobrar</span>
            <span className="accounting-dashboard__value">S/ 28,500</span>
          </div>
          <div className="accounting-dashboard__item accounting-dashboard__total">
            <span className="accounting-dashboard__label">Total Activos</span>
            <span className="accounting-dashboard__value accounting-dashboard__value--positive">S/ 73,700</span>
          </div>
        </div>

        <div className="accounting-dashboard__section">
          <div className="accounting-dashboard__section-title">PASIVOS</div>
          <div className="accounting-dashboard__item">
            <span className="accounting-dashboard__label">Cuentas por Pagar</span>
            <span className="accounting-dashboard__value">S/ 15,300</span>
          </div>
          <div className="accounting-dashboard__item">
            <span className="accounting-dashboard__label">Préstamos</span>
            <span className="accounting-dashboard__value">S/ 12,800</span>
          </div>
          <div className="accounting-dashboard__item accounting-dashboard__total">
            <span className="accounting-dashboard__label">Total Pasivos</span>
            <span className="accounting-dashboard__value accounting-dashboard__value--negative">S/ 28,100</span>
          </div>
        </div>

        <div className="accounting-dashboard__section">
          <div className="accounting-dashboard__item accounting-dashboard__total">
            <span className="accounting-dashboard__label">PATRIMONIO</span>
            <span className="accounting-dashboard__value accounting-dashboard__value--positive">S/ 45,600</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AccountingDashboard }