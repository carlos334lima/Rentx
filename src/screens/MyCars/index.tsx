import React, { useState } from 'react';
import { useEffect } from 'react';
import { api } from '../../services/api';

import {Container} from './styles'

export function MyCars() {
    const [cars,setCats] = useState([])
    const [loading,setLoading] = useState(true)


    useEffect(() => {
        async function fetchCars(){
            try {
                const response = await api.get(`schedules_byuser?users_id=1`);
                console.log(response.data)
            } catch (error) {
                
            }
        }

        fetchCars()
    },[])

    return (
        <Container></Container>
    )
}