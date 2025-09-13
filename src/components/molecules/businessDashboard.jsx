import './businessDashboard.css'

function BusinessDashboard() {
  return (
    <div className="business-dashboard">
      <div className="business-dashboard__header">
        <div className="business-dashboard__dots">
          <span className="business-dashboard__dot business-dashboard__dot--red"></span>
          <span className="business-dashboard__dot business-dashboard__dot--yellow"></span>
          <span className="business-dashboard__dot business-dashboard__dot--green"></span>
        </div>
        <span className="business-dashboard__title">Analytics Dashboard</span>
      </div>
      <div className="business-dashboard__content">
        <div className="business-dashboard__section">
          <h4 className="business-dashboard__section-title">Ventas Q4</h4>
          <div className="business-dashboard__chart">
            <div className="business-dashboard__bar" style={{height: '60%'}}>
              <span className="business-dashboard__value">$85K</span>
            </div>
            <div className="business-dashboard__bar" style={{height: '80%'}}>
              <span className="business-dashboard__value">$112K</span>
            </div>
            <div className="business-dashboard__bar" style={{height: '95%'}}>
              <span className="business-dashboard__value">$134K</span>
            </div>
          </div>
        </div>
        <div className="business-dashboard__metrics">
          <div className="business-dashboard__metric">
            <span className="business-dashboard__metric-label">ROI:</span>
            <span className="business-dashboard__metric-value">+23%</span>
          </div>
          <div className="business-dashboard__metric">
            <span className="business-dashboard__metric-label">Growth:</span>
            <span className="business-dashboard__metric-value">+15%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { BusinessDashboard }