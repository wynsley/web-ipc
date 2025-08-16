import './aboutMajorPriceCard.css';
import { AboutMajorHeading } from '../atoms/aboutMajorHeading';
import { AboutMajorButton } from '../atoms/aboutMajorButton';

const AboutMajorPriceCard = ({ icon: Icon, title, valuesIPC}) => {

  return (
    <div className='majorcar__item'>
      <div className='prince-icon'>
        {typeof Icon === "function" && <Icon size={50} color='#14800aff' />}
      </div>
      <AboutMajorHeading>{title}</AboutMajorHeading>
      <ul>
        {valuesIPC && valuesIPC.map((i, idx) => (
          <li className='major__menu__item' key={idx}>{i}</li>
        ))}
      </ul>
      <AboutMajorButton text='ver más' url='#' />
    </div>
  );
};

export { AboutMajorPriceCard };

