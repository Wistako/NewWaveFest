import { Alert, Container } from 'reactstrap';
import Workshops from '../../features/WorkShops/WorkShops';

const Prices = () =>  {
  return (
    <Container>
      <h1>Prices</h1>
      <p>Prices may differ according the day of the festival. Remember that ticket includes not only the star performance, but also 10+ workshops. We gathered several genre teachers to help you increase your vocal skills, as well as self confidence.</p>
      
      <Alert color="info">
          Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
      </Alert>
      <Workshops />  
    </Container>
  )
};

export default Prices;