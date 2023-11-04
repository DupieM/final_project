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

    const options = {
      responsive: true,
      animation: {
        animateRotate: false,
        animateScale: true,
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
              color: 'black'
            }
        },
      },
      scales: {
        x: {
          ticks: {
            color: 'black',
          },
          grid: {
            color: 'rgba(104,104,104,0.7)',
          },
        },
        y: {
          ticks: {
            color: 'black',
          },
          grid: {
            color: 'rgba(104,104,104,0.7)',
          },
        }
      }
    };
  
    // Format data for line chart
    const chartData = {
      labels: animalNames,
      datasets: [
        {
          label: 'Average litter size',
          data: animalitterlSizes,
          backgroundColor: 'rgba(195, 176, 0, 0.6)',
          borderColor: 'rgba(34, 81, 107, 0.5)',
        },
      ]
    }
  
      return (
        <div className="App">
            <div style={{ marginTop: 0}}>
                <img src={Background} alt="tiger" style={{ width: '1600px', height: '795px'}}/>
            </div>

            <Card style={{marginTop: '-39%', marginLeft: '10.5%' ,padding: '1%', width: 1250, backgroundColor: '#577D92', height: 480}}>
                <div style={{width: 890, marginLeft: 7, marginTop: 5}}>
                    <Line options={options} data={chartData} />
                </div>
                <br />
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
                }} style={{width: 140, backgroundColor: '#6897B0', marginLeft: '82%', marginTop: '-36%', borderColor: 'rgb(195, 176, 0)', borderWidth: 1}}>
                  <option value="">Choose Breed</option>
                  <option value="tiger">Tiger</option>
                  <option value="lion">Lion</option>
                  <option value="cat">Cat</option>
                  <option value="dog">Dog</option>
                  <option value="fox">Fox</option>
                </select>
                <p style={{marginLeft: '78%', marginTop: '3%', marginRight: '3%'}}>
                  Here you can view the litter size* of any of the following animal breeds that contains the word**: <br />
                  Tiger, Lion, Cat, Dog and Fox <br />
                  <br />
                  * Please note for some breeds no data is avaible and therefor it will be show as zero <br />
                  ** Select the animal 'name' you are interested in from the dropdown box
                </p>
            </Card>
        </div>
      )
}

export default Timeline;