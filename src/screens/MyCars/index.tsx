import React, { useEffect, useState } from 'react';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import * as S from './styles';

export function MyCars(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get('schedules_byuser?user_id=1');

        setCars(response.data);
      } catch(error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
  }, [])

  return(
    <S.Container>
      
    </S.Container>
  )
}