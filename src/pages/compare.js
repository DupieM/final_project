import React from "react";
import Background from './background2.jpg';
import { useState, useEffect } from 'react';
import { Chart as Chartjs } from 'chart.js/auto';
import { Card } from "react-bootstrap";
import {Bar} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import { Radar } from 'react-chartjs-2';
import axios from "axios";

function Compare() {

    const [animalData, setAnimalData] = useState([]);
    const [animalData1, setAnimalData1] = useState([]);
    const [animalNames, setAnimalNames] = useState([]);
    const [animalNames1, setAnimalNames1] = useState([]);
    const [animalTopSpeed, setAnimalTopSpeed] = useState([]);
    const [animalTopSpeed1, setAnimalTopSpeed1] = useState([]);
    const [animalNumberSpecies, setAnimalNumberSpecies] = useState([]);
    const [animalNumberSpecies1, setAnimalNumberSpecies1] = useState([]);
    const [Char1, setChar1] = useState([]);
    const [Char2, setChar2] = useState([]);
    const [Char3, setChar3] = useState([]);
    const [Char4, setChar4] = useState([]);
    
    // Array for radar
    let animal1 =[]
    let animal2 =[]

    // Array for radar name
    let animalname1 =[]
    let animalname2 =[]

    // Format data for Bar chart
    const chartData = {
        labels: ['Top Speed'],
        datasets: [
          {
            label: animalNames,
            data: animalTopSpeed,
            backgroundColor: 'rgba(195, 176, 0, 0.6)',
            borderColor: 'rgba(34, 81, 107, 0.5)',
          },
          {
            label: animalNames1,
            data: animalTopSpeed1,
            backgroundColor: 'rgba(53, 162, 235, 0.6)',
            borderColor: 'rgba(53, 162, 235, 0.5)',
          },
        ]
    };

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

    // Format data for Pie chart
    const chartData1 = {
        labels: [animalNames, animalNames1],
        datasets: [
          {
            label: 'Number of species',
            data: [animalNumberSpecies, animalNumberSpecies1],
            backgroundColor: ['rgba(195, 176, 0, 0.6)', 'rgba(53, 162, 235, 0.6)'],
            borderColor: 'rgba(87, 125, 146, 0.6)',
          },
        ]
    };

    const options1 = {
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
      }
    };
    // Format data for Radar chart
    const chartData2 = {
        labels: ['Age of Weaning', 'Gestation Period', 'Life Span', 'Sexual Maturity', 'Weight', 'Height'],
        datasets: [
          {
            label: Char3,
            data: Char1,
            backgroundColor: 'rgba(195, 176, 0, 0.5)',
          },
          {
            label: Char4,
            data: Char2,
            backgroundColor: 'rgba(53, 162, 235, 0.8)',
          },
        ]
    };

    const options2 = {
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
        r: {
          angleLines: {
            color: 'rgba(90,90,90,0.7)',
          },
          grid: {
            color: 'rgba(90,90,90,0.7)',
          },
          pointLabels: {
            color: 'black',
          },
          ticks: {
            color: 'black',
            
          }
        }
      }
    };

    return (
        <div className="App">
            <div style={{ marginTop: 0}}>
              <img src={Background} alt="tiger" style={{ width: '1423px', height: '820px'}}/>
            </div>

            <Card style={{marginTop: '-54%', marginLeft: '4%' ,padding: '1%', width: 650, backgroundColor: '#577D92', height: 340}}>
              <div style={{width: 610, marginLeft: 7, marginTop: 5}}>
                <Bar options={options} data={chartData} />
              </div>
            </Card>

            <Card style={{marginTop: '1.8%', marginLeft: '6%' , marginBottom: 5, padding: '1%', width: 600, backgroundColor: '#577D92', height: 380}}>
              <div style={{width: 360, marginLeft: 90, marginTop: -7}}>
                <Pie options={options1} data={chartData1} />
              </div>
            </Card>

            <Card style={{marginTop: '-52.8%', marginLeft: '53%' ,padding: '1%', width: 600, backgroundColor: '#577D92', height: 580}}>
              <div style={{width: 560, marginLeft: 7, marginTop: 5}}>
                <Radar options={options2} data={chartData2} />
              </div>
            </Card>

            <Card style={{marginTop: '1.6%', marginLeft: '53%' ,padding: '1%', width: 600, backgroundColor: '#577D92', height: 140}}>
              <select onChange={(e) => {
                console.log(e.target.value)
                axios({
                    method: "GET",
                    url: 'https://api.api-ninjas.com/v1/animals?name=' + e.target.value,
                    headers: { 'X-Api-Key': 'p31mA3zAJl7xjNaNX7Zdaw==Ms3ncGa9PnAHgpIi'},
                    contentType: 'application/json',
                  })
                  .then((response) => { 
                  setAnimalData(response.data)
                  const getAnimalNames = response.data.map((animal) => animal.name);
                  const animalTopSpeed = response.data.map((animal) => animal.characteristics.top_speed.slice(0,2));
                  const animalNumberSpecies = response.data.map((animal) => animal.characteristics.number_of_species);
                  const animalAgeWeaning = response.data[0].characteristics.age_of_weaning.split("")[0];
                  const animalGestationPeriod = response.data[0].characteristics.gestation_period.slice(0,2);
                  const animalLifeSpan = response.data[0].characteristics.lifespan.slice(0,2);
                  const animalAgeSexualMaturity = response.data[0].characteristics.age_of_sexual_maturity.split("")[0];
                  const animalWeight = response.data[0].characteristics.weight.slice(0,2);
                  const animalHeight = response.data[0].characteristics.length.slice(0,2);

                  animalname1.push(getAnimalNames);
                  animal1.push(animalAgeWeaning);
                  animal1.push(animalGestationPeriod);
                  animal1.push(animalLifeSpan);
                  animal1.push(animalAgeSexualMaturity);
                  animal1.push(animalWeight);
                  animal1.push(animalHeight);

                  setAnimalNames(getAnimalNames);
                  setAnimalTopSpeed(animalTopSpeed);
                  setAnimalNumberSpecies(animalNumberSpecies);
                  setChar1(animal1);
                  setChar3(animalname1);
                })
                }} style={{width: 170, marginLeft: 100}}>
                <option value="">Choose Animal One</option>
                <option value="clouded leopard">Clouded Leopard</option>
                <option value="african wild dog">African Wild Dog</option>
                <option value="dusky dolphin">Dusky Dolphin</option>
                <option value="blue whale">Blue Whale</option>
              </select>
              <select onChange={(d) => {
                console.log(d.target.value)
                axios({
                    method: "GET",
                    url: 'https://api.api-ninjas.com/v1/animals?name=' + d.target.value,
                    headers: { 'X-Api-Key': 'p31mA3zAJl7xjNaNX7Zdaw==Ms3ncGa9PnAHgpIi'},
                    contentType: 'application/json',
                  })
                  .then((response) => { 
                  setAnimalData1(response.data)
                  const getAnimalNames1 = response.data.map((animal) => animal.name);
                  const animalTopSpeed1 = response.data.map((animal) => animal.characteristics.top_speed.slice(0,2));
                  const animalNumberSpecies1 = response.data.map((animal) => animal.characteristics.number_of_species);
                  const animalAgeWeaning1 = response.data[0].characteristics.age_of_weaning.slice(0,1);
                  const animalGestationPeriod1 = response.data[0].characteristics.gestation_period.slice(7,10);
                  const animalLifeSpan1 = response.data[0].characteristics.lifespan.slice(0,2);
                  const animalAgeSexualMaturity1 = response.data[0].characteristics.age_of_sexual_maturity.slice(0,1);
                  const animalWeight1 = response.data[0].characteristics.weight.slice(6,8);
                  const animalHeight1 = response.data[0].characteristics.height.slice(0,2);

                  console.log(animalWeight1);
                  console.log(animalGestationPeriod1);

                  animalname2.push(getAnimalNames1);
                  animal2.push(animalAgeWeaning1);
                  animal2.push(animalGestationPeriod1);
                  animal2.push(animalLifeSpan1);
                  animal2.push(animalAgeSexualMaturity1);
                  animal2.push(animalWeight1);
                  animal2.push(animalHeight1);

                  setAnimalNames1(getAnimalNames1);
                  setAnimalTopSpeed1(animalTopSpeed1);
                  setAnimalNumberSpecies1(animalNumberSpecies1);
                  setChar2(animal2);
                  setChar4(animalname2);
                })
                }}  style={{width: 170, marginLeft: 280, marginTop: -25.7}}>
                <option value="">Choose Animal Two</option>
                <option value="cape lion">Cape Lion</option>
                <option value="cheetah">Cheetah</option>
                <option value="patas monkey">Patas Monkey</option>
                <option value="koala">Koala</option>
              </select>
            </Card> 
        </div>
    )
}

export default Compare;