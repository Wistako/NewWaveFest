import { Alert, Progress } from 'reactstrap';

import numberToString from '../../../utils/numberToString';
import { useSelector, useDispatch } from 'react-redux';
import { getConcerts, getRequest, loadConcertsRequest } from '../../../redux/concertsRedux';
import { useEffect } from 'react';

const Workshops = () => {

  const dispatch = useDispatch();
  const concerts = useSelector(getConcerts)
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadConcertsRequest())
  }, [dispatch]);

  if(request.pending) return <Progress animated color="primary" value={50} />; 
  else if(request.error) return <Alert color="warning">{request.error}</Alert>;
  else if(!request.success || !concerts.length) return <Alert color="info">No concerts</Alert>;
  else if(request.success) return (
    <div>
      {concerts.map(concert => (
        <div key={concert._id}>
          <h2>Day {numberToString(concert.day)}</h2>
          <p>Price: {concert.price}$</p>
          <p>Workshops: {concert.genre}</p>
        </div>
      ))}
    </div>

  )

}

export default Workshops;