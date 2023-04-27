import { useParams } from 'react-router-dom';
import DonateSingle from './DonateSingle';
import DonateMain from './DonateMain';

export default function Donate() {
  const { id } = useParams();

  return id ? <DonateSingle slug={id} /> : <DonateMain />;
}
