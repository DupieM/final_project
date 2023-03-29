import React from "react";
import { useState, useEffect } from 'react';
import { Chart as Chartjs } from 'chart.js/auto'
import {Line} from 'react-chartjs-2';
import Background from './background2.jpg';
import { Card } from "react-bootstrap"
import axios from "axios";
import { getValue } from "@testing-library/user-event/dist/utils";

function Timeline() {

    const [animalData, setAnimalData] = useState([]);
    const [animalNames, setAnimalNames] = useState([]);
    const [animalitterlSizes, setAnimalLitterSizes] = useState([]);
  
    // Format data for line chart
    const chartData = {
      labels: animalNames,
      datasets: [
        {
          label: 'Average litter size',
          data: animalitterlSizes,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ]
    }
  
      return (
        <div className="App">
            <div style={{ margin: '0px' }}>
                <img src={Background} alt="tiger" style={{ width: '1423px', height: '710px'}}/>
            </div>

            <Card style={{marginTop: '-46%', marginLeft: '8%' ,padding: '1%', width: 1200, backgroundColor: 'white', height: 600}}>
                <div style={{width: 1100, marginLeft: 10, marginTop: 4}}>
                    <Line data={chartData} />
                </div>
            </Card>

            <select onChange={(e) => {
              console.log(e.target.value)
              axios({
                method: "GET",
                url: 'https://api.api-ninjas.com/v1/animals?name=' + e.target.value,
                headers: { 'X-Api-Key': 'p31mA3zAJl7xjNaNX7Zdaw==Ms3ncGa9PnAHgpIi'},
                contentType: 'application/json',
              })
              .then((response) => {
                // console.log(response.data)
                setAnimalData(response.data)
          
                // Extract tiger names and average litter sizes from response data
                const getAnimalNames = response.data.map((animal) => animal.name);
                const animalLitterSizes = response.data.map((animal) => animal.characteristics.average_litter_size || 0);
                
                
                // Update state variables
                setAnimalNames(getAnimalNames);
                setAnimalLitterSizes(animalLitterSizes);
          
                console.log(getAnimalNames);
                console.log(animalLitterSizes);
              })

            }}>
              <option value="">Choose Animal</option>
              <option value="tiger">Tiger</option>
              <option value="lion">Lion</option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="fox">Fox</option>
            </select>
            
        </div>
      )
}

export default Timeline;