import './aboutUsBeginningParag.css'

const AboutUsParagaText = ({ type, children }) => {
  const Tag = type || 'p';
  return <Tag className={`text-${type}`}>{children}</Tag>;
};

export {AboutUsParagaText};